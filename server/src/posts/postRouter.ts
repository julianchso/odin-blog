import { Router } from 'express';

import { newPostsPost } from './postController';

const postRouter = Router();

postRouter.post('/newPost', newPostsPost);

export default postRouter;
