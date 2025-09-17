import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';
import { NotFoundException } from '@nestjs/common';

export class MeUseCase implements UseCase<CreatedUserDto> {
  private readonly createdUserMapper: CreatedUserMapper;
  constructor(private readonly userRepo: UsersRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }
  public async execute(id: string): Promise<CreatedUserDto> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.createdUserMapper.mapTo(user);
  }
}
