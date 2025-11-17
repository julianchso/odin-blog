import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('verifyToken middleware called');
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  console.log(`bearer: ${bearerHeader}`);

  if (!bearerHeader) {
    return res.status(401).json({ error: 'token missing verify token' });
  }

  const bearerToken = bearerHeader! && bearerHeader.split(' ')[1];

  if (!process.env.TOKEN_SECRET) {
    return res.status(500).json({ error: 'TOKEN_SECRET missing' });
  }

  jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verify failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    (req as any).user = decoded;
    next();
  });
};

export default verifyToken;
