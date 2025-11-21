import { Router } from 'express';

import { signUpPost, loginPost, logoutPost } from './authController';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', loginPost);
authRouter.post('/logout', logoutPost);

export default authRouter;
