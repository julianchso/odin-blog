import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';

import authRouter from './auth/authRouter';
import postRouter from './posts/postRouter';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));

app.use('/api', authRouter);
app.use('/api/posts', postRouter);

app.use((req, res: Response, next: NextFunction) => {
  console.log('app user middleware called');
  console.log(`app use req.user: ${req.user}`);
  res.locals.currentUser = req.user;
  next();
});

app.listen(PORT, () => {
  console.log(`express app listening on PORT ${PORT}`);
});
