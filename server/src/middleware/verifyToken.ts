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
  // Get auth header value
  console.log('verifyToken verify token');
  const bearerHeader = req.headers['authorization'];
  console.log(`verifyToken bearerHeader: ${bearerHeader}`);

  if (!bearerHeader) {
    return res.status(401).json({ error: 'token missing verify token' });
  }

  const bearerToken = bearerHeader! && bearerHeader.split(' ')[1];
  console.log(`bearerToken: ${bearerToken}`);

  if (!process.env.TOKEN_SECRET) {
    return res.status(500).json({ error: 'TOKEN_SECRET missing' });
  }

  jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err: jwt.VerifyErrors | null, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }

    console.log(`verifyToken jwt.verify`);
    (req as any).user = decoded;

    // middleware should only call next(). It should not send a json response (unless error)
    next();
  });
};

export default verifyToken;
