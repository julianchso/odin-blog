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

const getAllPostsPrisma = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: { username: true },
      },
    },
  });
};

const getPostDetailPrisma = async (postId: string) => {
  return await prisma.post.findUnique({
    where: {
      postId: postId,
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
};

const getUsernameFromId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });
};

export { createPostPrisma, getAllPostsPrisma, getPostDetailPrisma, getUsernameFromId };
