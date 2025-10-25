import { Router } from 'express';

import { homeGet, signUpPost, loginPost, logoutPost } from './authController';
import verifyToken from '../middleware/verifyToken';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', loginPost);
authRouter.post('/logout', logoutPost);

authRouter.get('/posts', verifyToken, homeGet);

export default authRouter;
