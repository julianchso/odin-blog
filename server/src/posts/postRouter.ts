import { Router } from 'express';

import { newPostsPost } from './postController';
import verifyToken from '../middleware/verifyToken';
import attachUser from '../middleware/attachUser';

const postRouter = Router();

postRouter.post('/newPost', verifyToken, attachUser, newPostsPost);

export default postRouter;
