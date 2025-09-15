import { Entity } from '@/core/base/entity';
import { Role } from '@prisma/client';

export class UserEntity extends Entity {
  name: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  last_login_at: Date;
  role: Role;
}
