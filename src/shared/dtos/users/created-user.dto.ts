import { Role } from '@prisma/client';

export class CreatedUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  last_login_at: Date;
  role: Role;
}
