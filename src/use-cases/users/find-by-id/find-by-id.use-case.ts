import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';

export class FindByIdUseCase implements UseCase<CreatedUserDto> {
  private createdUserMapper: CreatedUserMapper;
  constructor(private readonly repository: UsersRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(id: string): Promise<CreatedUserDto> {
    try {
      const user = await this.repository.findOne({
        id,
      });
      return this.createdUserMapper.mapTo(user);
    } catch (error) {
      console.error('🚀 ~ FindByIdUseCase ~ execute ~ error:', error);
      throw new Error('Error system');
    }
  }
}
