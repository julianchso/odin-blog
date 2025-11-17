import * as express from 'express';

declare global {
  namespace Express {
    interface TokenPayload {
      userId: string;
      username: string;
      role: string;
    }

    interface Request {
      user?: TokenPayload;
    }
  }
}
