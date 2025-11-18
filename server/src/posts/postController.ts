import type { Request, Response } from 'express';

import { createPostPrisma } from './postPrisma';

const newPostsPost = async (req: Request, res: Response) => {
  const user = res.locals.currentUser;
  console.log(user);

  const title = req.body.title;
  const content = req.body.content;
  const userId = res.locals.currentUser.tokenPayload.userId;
  console.log(userId);

  const hyphenTitle = title.replace(/\s+/g, '-');
  const status = 'PUBLISHED';

  try {
    await createPostPrisma(title, hyphenTitle, userId, content, status);
  } catch (err) {
    console.log(err);
  }
};

export { newPostsPost };
