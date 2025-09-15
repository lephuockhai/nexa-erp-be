import { Entity } from '@/core/base/entity';

export class OTPEntity extends Entity {
  phone: string;
  code: string;
  expiredAt: Date;
  createdAt: Date;
}
