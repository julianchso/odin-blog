import jwt from 'jsonwebtoken';
import { Jwt } from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { Request, Response, NextFunction } from 'express';

configDotenv();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    console.log('call verifyToken !undefined');
    const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
    req.token = bearerToken;
    return res.status(200).json({ message: 'verified' });
    next();
  } else {
    // Forbidden
    return res.status(403).json({ message: 'forbidden' });
  }
};

export default verifyToken;
