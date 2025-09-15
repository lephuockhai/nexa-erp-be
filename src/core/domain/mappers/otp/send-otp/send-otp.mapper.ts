import { Mapper } from '@/core/base/mapper';
import { OTPEntity } from '@/core/domain/entities/otp.entity';
import { SendOTPDto } from '@/shared/dtos/otp/send-otp.dto';

export class SendOTPMapper extends Mapper<SendOTPDto, OTPEntity> {
  public mapFrom(data: SendOTPDto): OTPEntity {
    const otp = new OTPEntity();

    otp.phone = data.phone;

    return otp;
  }
  public mapTo(data: OTPEntity): SendOTPDto {
    const otp = new SendOTPDto();

    otp.phone = data.phone;
    return otp;
  }
}
