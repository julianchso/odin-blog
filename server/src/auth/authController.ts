import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { genPassword } from '../utils/passwordUtils';
import prisma from '../database/prismaClient';
import { Role } from '@prisma/client';

import { validatePassword } from '../utils/passwordUtils';

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

    jwt.sign({ user }, 'secretKey', { algorithm: 'HS256' }, (err: Error | null, token?: string) => {
      if (err || !token) {
        console.error('Error signing token: ', err);
        return res.status(500).json({ error: 'Token generation failed' });
      }
      console.log(`token: ${token}`);
      return res
        .status(200)
        .json({ message: 'authentication successful', token: { token: token } });
    });

    res.status(200).json({ message: 'Login successful', user: { username: req.body.username } });
  } catch (err) {
    console.log(err);
  }
};

export { signUpPost, loginPost };
