import { UseCase } from '@/core/base/use-case';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { FindByPhoneUseCase } from '../find-by-phone/find-by-phone.use-case';
import { CreateOTPDto } from '@/shared/dtos/otp/create-otp.dto';
type Response = {
  message?: string;
  ok: boolean;
};

export class VerifyOTPUseCase implements UseCase<Response> {
  constructor(
    private readonly repository: OTPRepository,
    public readonly findByPhoneUseCase: FindByPhoneUseCase,
  ) {}
  public async execute(data: CreateOTPDto): Promise<Response> {
    try {
      const now = new Date();
      const lastestOTP = await this.findByPhoneUseCase.execute(data.phone);
      if (!lastestOTP || (lastestOTP && data.code !== lastestOTP.code)) {
        return {
          message: 'Verify is not successfully',
          ok: false,
        };
      }
      if (lastestOTP && now > new Date(lastestOTP.expiredAt)) {
        return {
          message: 'OTP was expired.',
          ok: false,
        };
      }
      return {
        message: 'Verify is successfully',
        ok: true,
      };
    } catch (error) {
      console.log('🚀 ~ VerifyOTP ~ execute ~ error:', error);
      return {
        message: 'Verify is not successfully',
        ok: false,
      };
    }
  }
}
