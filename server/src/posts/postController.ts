import type { Request, Response } from 'express';

import { createPostPrisma, getAllPostsPrisma } from './postPrisma';

const newPostsPost = async (req: Request, res: Response) => {
  const user = res.locals.currentUser;
  // console.log(user);

  const title = req.body.title;
  const content = req.body.content;
  const userId = res.locals.currentUser.tokenPayload.userId;
  // console.log(userId);

  const hyphenTitle = title.replace(/\s+/g, '-');
  const status = 'PUBLISHED';

  try {
    await createPostPrisma(title, hyphenTitle, userId, content, status);

    return res.status(201).json({
      message: 'Post created successfully',
      title: title,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

const AllPostsGet = async (_req: Request, res: Response) => {
  try {
    const data = await getAllPostsPrisma();
    return res.status(201).json({
      message: 'Get all posts',
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get all posts' });
  }
};

export { newPostsPost, AllPostsGet };
