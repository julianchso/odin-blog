import { genPassword } from '../utils/passwordUtils';
import prisma from '../database/prismaClient';
import { Role } from '@prisma/client';

import type { NextFunction, Request, Response } from 'express';

const signUpPost = async (req: Request, res: Response) => {
  try {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    await prisma.user.create({
      data: {
        username: req.body.username,
        salt: salt,
        hash: hash,
        role: Role.USER,
      },
    });

    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};

export { signUpPost };
