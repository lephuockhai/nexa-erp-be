import * as bcrypt from 'bcrypt';

export const HashedPassword = (password: string): string => {
  if (!password) return null;
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const VerifiedPassword = async (
  password: string,
  hashPassword: string,
) => {
  if (!password || !hashPassword) return false;
  return await bcrypt.compare(password, hashPassword);
};
