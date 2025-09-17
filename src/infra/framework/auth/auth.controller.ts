import { LoginDto } from '@/shared/dtos/auth/login.dto';
import { RefreshDto } from '@/shared/dtos/auth/refresh.dto';
import { CreateOTPDto } from '@/shared/dtos/otp/create-otp.dto';
import { SendOTPDto } from '@/shared/dtos/otp/send-otp.dto';
import { LoginUseCase } from '@/use-cases/auth/login';
import { MeUseCase } from '@/use-cases/auth/me';
import { RefreshUseCase } from '@/use-cases/auth/refresh';
import { SendOTPUseCase } from '@/use-cases/otp/send-otp';
import { VerifyOTPUseCase } from '@/use-cases/otp/verify-otp';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private loginUseCase: LoginUseCase,
    private refreshUseCase: RefreshUseCase,
    private meUseCase: MeUseCase,
  ) {}

  @Post('/send-otp')
  async sendOTP(@Body() data: SendOTPDto) {
    return this.sendOTPUseCase.execute(data);
  }

  @Post('/verify-otp')
  async verifyOTP(@Body() data: CreateOTPDto) {
    return this.verifyOTPUseCase.execute(data);
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.loginUseCase.execute(data);
  }

  @Get('/me')
  async me(@Req() req) {
    const userId = req.user.sub;
    return this.meUseCase.execute(userId);
  }

  @Post('/refresh')
  async refresh(@Body() data: RefreshDto) {
    return this.refreshUseCase.execute(data);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Logged out successfully' };
  }
}
