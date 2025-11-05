import prisma from '../database/prismaClient';

export const findAllPosts = async () => {
  return await prisma.post.findMany();
};
