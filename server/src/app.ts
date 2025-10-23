import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';

import authRouter from './auth/authRouter';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`express app listening on PORT ${PORT}`);
});
