import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UpdateUserMapper } from '@/core/domain/mappers/users/update-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';

export class UpdateUserUseCase implements UseCase<CreatedUserDto> {
  private updateUserMapper: UpdateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UsersRepository) {
    this.updateUserMapper = new UpdateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: UpdateUserDto): Promise<CreatedUserDto> {
    try {
      const { id, ...entity } = this.updateUserMapper.mapFrom(user);
      const updatedUser = await this.repository.update(id, entity);
      return this.createdUserMapper.mapTo(updatedUser);
    } catch (error) {
      console.error('🚀 ~ UpdateUserUseCase ~ execute ~ error:', error);
      throw new Error('Error system');
    }
  }
}
