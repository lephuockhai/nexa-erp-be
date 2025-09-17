export const jwtConstants = {
  secretAccess: process.env.JWT_SECRET || 'nexa-never-die',
  secretRefresh: process.env.JWT_REFRESH_SECRET || 'nexa-never-die',
};
