import { UseCase } from '@/core/base/use-case';
import { LoginMapper } from '@/core/domain/mappers/auth/login';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { jwtConstants } from '@/shared/constant';
import { LogedinDto } from '@/shared/dtos/auth/logedin.dto';
import { LoginDto } from '@/shared/dtos/auth/login.dto';
import { VerifiedPassword } from '@/shared/utils/password';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type Response = {
  message: string;
  code: number;
};

export class LoginUseCase implements UseCase<LogedinDto | Response> {
  private loginMapper: LoginMapper;
  private createdUserMapper: CreatedUserMapper;
  constructor(
    private readonly userRepo: UsersRepository,
    private jwtService: JwtService,
  ) {
    this.loginMapper = new LoginMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }
  public async execute(data: LoginDto): Promise<LogedinDto | Response> {
    const entity = this.loginMapper.mapFrom(data);
    let user;
    if (entity.phone) {
      user = await this.userRepo.findOne({ phone: entity.phone });
    } else if (entity.email) {
      user = await this.userRepo.findOne({ email: entity.email });
    }

    // Comparing password
    const matchingPass = await VerifiedPassword(
      data.password,
      user.password_hash,
    );
    if (!user || !matchingPass)
      throw new UnauthorizedException('Info login is incorrect');
    // generate token
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    // access token (ngắn hạn)
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secretAccess,
      expiresIn: '15m',
    });

    // refresh token (dài hạn)
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secretRefresh,
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: this.createdUserMapper.mapTo(user),
    };
  }
}
