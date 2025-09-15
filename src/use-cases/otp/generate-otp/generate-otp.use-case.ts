import { UseCase } from '@/core/base/use-case';
import { CreateOTPMapper } from '@/core/domain/mappers/otp/create-otp';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { CreateOTPDto } from '@/shared/dtos/otp/create-otp.dto';
import { generateOTP } from '@/shared/utils/otp';

type Response = {
  ok: boolean;
};

export class GenerateOTP implements UseCase<Response> {
  private createOTPMapper: CreateOTPMapper;
  constructor(private readonly repository: OTPRepository) {
    this.createOTPMapper = new CreateOTPMapper();
  }
  public async execute(phone: string): Promise<Response> {
    try {
      const otpCode = generateOTP(6);
      const data: CreateOTPDto = {
        phone: phone,
        code: otpCode,
      };
      const entity = this.createOTPMapper.mapFrom(data);
      await this.repository.create(entity);
      return {
        ok: true,
      };
    } catch (error) {
      console.log('🚀 ~ GenerateOTP ~ execute ~ error:', error);
      return {
        ok: false,
      };
    }
  }
}
