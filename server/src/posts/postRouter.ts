import { Router } from 'express';

import { newPostsPost, AllPostsGet, PostDetailGet } from './postController';

import verifyToken from '../middleware/verifyToken';
import attachUser from '../middleware/attachUser';

const postRouter = Router();

postRouter.post('/newPost', verifyToken, attachUser, newPostsPost);
postRouter.get('/', AllPostsGet);
postRouter.get('/:postId', PostDetailGet);

export default postRouter;
