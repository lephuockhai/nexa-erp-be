import { UseCase } from '@/core/base/use-case';
import { CreatedOTPMapper } from '@/core/domain/mappers/otp/created-otp';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { CreatedOTPDto } from '@/shared/dtos/otp/created-otp.dto';

export class FindByPhoneUseCase implements UseCase<CreatedOTPDto> {
  private createdOTPMapper: CreatedOTPMapper;
  constructor(private readonly repository: OTPRepository) {
    this.createdOTPMapper = new CreatedOTPMapper();
  }
  public async execute(phone: string): Promise<CreatedOTPDto> {
    try {
      const otp = await this.repository.findOne({ phone });
      return this.createdOTPMapper.mapTo(otp);
    } catch (error) {
      console.log('🚀 ~ FindByPhoneUseCase ~ execute ~ error:', error);
      return null;
    }
  }
}
