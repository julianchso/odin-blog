import { Router } from 'express';

import { newPostsPost } from './postController';
import verifyToken from '../middleware/verifyToken';

const postRouter = Router();

postRouter.post('/newPost', verifyToken, newPostsPost);

export default postRouter;
