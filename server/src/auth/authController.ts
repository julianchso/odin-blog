import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

import { genPassword } from '../utils/passwordUtils';
import prisma from '../database/prismaClient';
import { Role } from '@prisma/client';
import { validatePassword } from '../utils/passwordUtils';

configDotenv();

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

const signUpPost = async (req: Request, res: Response) => {
  try {
    const saltHash = genPassword(req.body.password);
    const salt: string = saltHash.salt;
    const hash: string = saltHash.hash;

    await prisma.user.create({
      data: {
        username: req.body.username,
        salt: salt,
        hash: hash,
        role: Role.USER,
      },
    });

    res.status(200).json({ message: 'User created', user: { username: req.body.username } });
  } catch (err) {
    console.log(err);
  }
};

const loginPost = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    let isAuthenticated = false;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'wrong username or password' });
    }

    const isValidPassword = validatePassword(password, user.hash, user.salt);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'wrong password' });
    }

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: TOKEN_SECRET missing' });
    }

    // generate token
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
    isAuthenticated = true;

    res.status(200).json({
      message: 'Login successful',
      token,
      isAuthenticated,
      user: { username: req.body.username },
    });
  } catch (err) {
    console.log(err);
  }
};

const logoutPost = (_req: Request, _res: Response) => {
  localStorage.removeItem('jwt');
};

const homeGet = (req: Request, res: Response) => {
  if (!req.token) {
    return res.status(500).json({ error: 'token missing' });
  }

  if (!process.env.TOKEN_SECRET) {
    return res.status(500).json({ error: 'TOKEN_SECRET missing' });
  }

  jwt.verify(
    req.token,
    process.env.TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, authData: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403);
      } else {
        res.json({
          message: 'Authenticated...',
          authData,
        });
      }
    }
  );
};

export { signUpPost, loginPost, logoutPost, homeGet };
