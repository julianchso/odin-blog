import { PostStatus } from '@prisma/client';
import prisma from '../database/prismaClient';
import { JsonObject } from '@prisma/client/runtime/library';

const createPostPrisma = async (
  title: string,
  slug: string,
  userId: string,
  content: JsonObject,
  status: PostStatus
) => {
  return await prisma.post.create({
    data: {
      title: title,
      slug: slug,
      userId: userId,
      content: content,
      status: status,
    },
  });
};

export { createPostPrisma };
