import { Router } from 'express';
import passport from 'passport';

import { signUpPost } from './authController';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', passport.authenticate('local'), () => {});

export default authRouter;
