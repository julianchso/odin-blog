import express from 'express';
import bodyParser from 'body-parser';
// import passport from 'passport';
import 'dotenv/config';

import authRouter from './auth/authRouter';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// app.use(passport.initialize());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`express app listening on PORT ${PORT}`);
});
