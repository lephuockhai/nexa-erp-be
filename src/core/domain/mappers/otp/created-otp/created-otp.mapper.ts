import { Mapper } from '@/core/base/mapper';
import { OTPEntity } from '@/core/domain/entities/otp.entity';
import { CreatedOTPDto } from '@/shared/dtos/otp/created-otp.dto';

export class CreatedOTPMapper extends Mapper<CreatedOTPDto, OTPEntity> {
  public mapFrom(data: CreatedOTPDto): OTPEntity {
    const otp = new OTPEntity();

    otp.code = data.code;
    otp.phone = data.phone;
    otp.expiredAt = data.expiredAt;

    return otp;
  }
  public mapTo(data: OTPEntity): CreatedOTPDto {
    const otp = new CreatedOTPDto();

    otp.code = data.code;
    otp.phone = data.phone;
    otp.expiredAt = data.expiredAt;

    return otp;
  }
}
