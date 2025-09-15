import { Mapper } from '@/core/base/mapper';
import { OTPEntity } from '@/core/domain/entities/otp.entity';
import { CreateOTPDto } from '@/shared/dtos/otp/create-otp.dto';

export class CreateOTPMapper extends Mapper<CreateOTPDto, OTPEntity> {
  public mapFrom(data: CreateOTPDto): OTPEntity {
    const otp = new OTPEntity();
    const expiredTime = new Date();
    expiredTime.setMinutes(expiredTime.getMinutes() + 5);

    otp.phone = data.phone;
    otp.code = data.code;
    otp.expiredAt = expiredTime;

    return otp;
  }
  public mapTo(data: OTPEntity): CreateOTPDto {
    const otp = new CreateOTPDto();

    otp.phone = data.phone;
    return otp;
  }
}
