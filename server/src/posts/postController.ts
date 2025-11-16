import type { Request, Response } from 'express';
import prisma from '../database/prismaClient';

const newPostsPost = async (req: Request, _res: Response) => {
  const data = req.body;
  const title = req.body.title;
  const content = req.body.content;

  const hyphenTitle = title.replace(/\s+/g, '-');
  console.log('new posts post');
  console.log(title);
  console.log(hyphenTitle);
  console.log(content);

  try {
    await prisma.post.create({
      data: {
        title: req.body.title,
        slug: hyphenTitle,
        userId: req.currentUser,
        content: content,
        status: 'PUBLISHED',
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export { newPostsPost };
