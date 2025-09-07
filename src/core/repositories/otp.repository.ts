import { Repository } from '@/core/base/repository';
import { OTPEntity } from '../domain/entities/otp.entity';

export abstract class OTPRepository extends Repository<OTPEntity> {}
