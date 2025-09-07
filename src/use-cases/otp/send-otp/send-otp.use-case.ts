import { UseCase } from '@/core/base/use-case';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { GenerateOTP } from '../generate-otp/generate-otp.use-case';
import { SendOTPDto } from '@/shared/dtos/otp/send-otp.dto';
import { SendOTPMapper } from '@/core/domain/mappers/otp/send-otp';
import { UsersRepository } from '@/core/repositories/users.repository';

type Response = {
  message?: string;
  ok: boolean;
};

export class SendOTPUseCase implements UseCase<Response> {
  private sendOTPMapper: SendOTPMapper;
  constructor(
    private readonly repository: OTPRepository,
    public readonly generateOTP: GenerateOTP,
    private readonly userRepo: UsersRepository,
  ) {
    this.sendOTPMapper = new SendOTPMapper();
  }
  public async execute(data: SendOTPDto): Promise<Response> {
    try {
      // Generate otp
      const entity = this.sendOTPMapper.mapFrom(data);
      // Checking existing phone in user table
      const user = await this.userRepo.findOne({ phone: entity.phone });
      if (!user) {
        return {
          message: 'Phone is not existing',
          ok: false,
        };
      }
      const { ok } = await this.generateOTP.execute(entity.phone);
      if (!ok) {
        return {
          message: 'Create OTP failure',
          ok: false,
        };
      }
      // simulation send OTP
      return {
        ok: true,
      };
    } catch (error) {
      console.log('🚀 ~ SendOTPUseCase ~ execute ~ error:', error);
      return {
        message: 'Send OTP failure',
        ok: false,
      };
    }
  }
}
