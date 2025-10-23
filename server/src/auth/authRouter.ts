import { Router } from 'express';

import { homeGet, signUpPost, loginPost } from './authController';
import verifyToken from '../middleware/verifyToken';

const authRouter = Router();

authRouter.post('/signUp', signUpPost);
authRouter.post('/login', verifyToken, loginPost);

authRouter.get('/posts', verifyToken, homeGet);

export default authRouter;
