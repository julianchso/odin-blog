import { Router } from 'express';
import passport from 'passport';

import { signUpPost, loginPost } from './authController';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', loginPost);

export default authRouter;
