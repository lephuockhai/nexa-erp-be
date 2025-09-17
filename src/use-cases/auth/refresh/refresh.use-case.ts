import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { jwtConstants } from '@/shared/constant';
import { LogedinDto } from '@/shared/dtos/auth/logedin.dto';
import { RefreshDto } from '@/shared/dtos/auth/refresh.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type Response = {
  message: string;
  code: number;
};

export class RefreshUseCase implements UseCase<LogedinDto | Response> {
  private createdUserMapper: CreatedUserMapper;
  constructor(
    private readonly userRepo: UsersRepository,
    private jwtService: JwtService,
  ) {
    this.createdUserMapper = new CreatedUserMapper();
  }
  public async execute(data: RefreshDto): Promise<LogedinDto | Response> {
    try {
      // Get payload from token
      const payload = await this.jwtService.verifyAsync(data.refreshToken, {
        secret: jwtConstants.secretRefresh,
      });

      // Get user info from dB
      const user = await this.userRepo.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');

      // generate token
      const newPayload = {
        sub: user.id,
        email: user.email,
      };
      // Refresh new token
      const accessToken = this.jwtService.sign(newPayload, {
        secret: jwtConstants.secretAccess,
        expiresIn: '15m',
      });

      const refreshToken = this.jwtService.sign(newPayload, {
        secret: jwtConstants.secretRefresh,
        expiresIn: '7d',
      });
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: this.createdUserMapper.mapTo(user),
      };
    } catch (error) {
      console.log('🚀 ~ RefreshUseCase ~ execute ~ error:', error);
      throw new UnauthorizedException('Authentication is failure');
    }
  }
}
