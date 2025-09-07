import { CreateOTPDto } from '@/shared/dtos/otp/create-otp.dto';
import { SendOTPDto } from '@/shared/dtos/otp/send-otp.dto';
import { SendOTPUseCase } from '@/use-cases/otp/send-otp';
import { VerifyOTPUseCase } from '@/use-cases/otp/verify-otp';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
  ) {}

  @Post('/send-otp')
  async sendOTP(@Body() data: SendOTPDto) {
    return this.sendOTPUseCase.execute(data);
  }

  @Post('/verify-otp')
  async verifyOTP(@Body() data: CreateOTPDto) {
    return this.verifyOTPUseCase.execute(data);
  }
}
