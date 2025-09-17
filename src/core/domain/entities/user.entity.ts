import { Entity } from '@/core/base/entity';

export class UserEntity extends Entity {
  name: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  last_login_at: Date;
}
