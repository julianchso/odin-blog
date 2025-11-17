import { Router } from 'express';

import { signUpPost, loginPost, logoutPost, postsGet } from './authController';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', loginPost);
authRouter.post('/logout', logoutPost);

// authRouter.get('/posts', verifyToken, postsGet);
authRouter.get('/posts', postsGet);

export default authRouter;
