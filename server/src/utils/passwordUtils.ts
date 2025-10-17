import crypto from 'crypto';

const genPassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex');
  // 1000 iterations, hash length is 64, sha512 is the hashing function. Then convert to hexadecimal string.
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
};

const validatePassword = (password: string, hash: string, salt: string) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

export { genPassword, validatePassword };
