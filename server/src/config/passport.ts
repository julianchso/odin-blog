import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../database/prismaClient';
import { validatePassword } from '../utils/passwordUtils';

export default passport.use(
  new LocalStrategy(async (username: string, password: string, done: Function) => {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    // if no user, null means no error but also no user
    if (!user) {
      return done(null, false, { message: 'incorrect username' });
    }
    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

// Is this only needed for sessions?
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Is this only needed for sessions?
passport.deserializeUser((userId: string, done) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (err) {
    done(err, null);
  }
});
