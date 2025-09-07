import { PrismaUsersRepository } from '@/infra/data/prisma/prisma-users.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SendOTPUseCase } from '@/use-cases/otp/send-otp';
import { VerifyOTPUseCase } from '@/use-cases/otp/verify-otp';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { GenerateOTP } from '@/use-cases/otp/generate-otp/generate-otp.use-case';
import { FindByPhoneUseCase } from '@/use-cases/otp/find-by-phone/find-by-phone.use-case';
import { UsersRepository } from '@/core/repositories/users.repository';
import { PrismaOTPRepository } from '@/infra/data/prisma/prisma-otp.repository';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: OTPRepository,
      useFactory: (prisma: PrismaService) => new PrismaOTPRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: UsersRepository,
      useFactory: (prisma: PrismaService) => new PrismaUsersRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: GenerateOTP,
      useFactory: (repository: OTPRepository) => new GenerateOTP(repository),
      inject: [OTPRepository],
    },
    {
      provide: FindByPhoneUseCase,
      useFactory: (repository: OTPRepository) =>
        new FindByPhoneUseCase(repository),
      inject: [OTPRepository],
    },
    {
      provide: SendOTPUseCase,
      useFactory: (
        repository: OTPRepository,
        generateOTP: GenerateOTP,
        userRepo: UsersRepository,
      ) => new SendOTPUseCase(repository, generateOTP, userRepo),
      inject: [OTPRepository, GenerateOTP, UsersRepository],
    },
    {
      provide: VerifyOTPUseCase,
      useFactory: (
        repository: OTPRepository,
        findByPhoneUseCase: FindByPhoneUseCase,
      ) => new VerifyOTPUseCase(repository, findByPhoneUseCase),
      inject: [OTPRepository, FindByPhoneUseCase],
    },
  ],
})
export class AuthModule {}
