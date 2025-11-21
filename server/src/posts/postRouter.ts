import { Router } from 'express';

import { newPostsPost, AllPostsGet } from './postController';

import verifyToken from '../middleware/verifyToken';
import attachUser from '../middleware/attachUser';

const postRouter = Router();

postRouter.post('/newPost', verifyToken, attachUser, newPostsPost);
postRouter.get('/', AllPostsGet);

export default postRouter;
