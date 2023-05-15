import * as bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password: string, hashedPassword: string) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

const authUtils = {
  hashPassword,
  comparePassword,
};

export default authUtils;
