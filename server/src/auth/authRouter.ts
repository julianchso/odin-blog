import { Router } from 'express';
import passport from 'passport';
import { signUpPost } from './authController';

const authRouter = Router();

authRouter.post('/SignUp', signUpPost);
authRouter.post('/login', passport.authenticate('local'), (req, res, next) => {});

export default authRouter;
