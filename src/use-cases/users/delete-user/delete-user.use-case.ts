import { UseCase } from '@/core/base/use-case';
import { UsersRepository } from '@/core/repositories/users.repository';

type Response = {
  message: string;
  code: number;
};

export class DeletedUserUseCase implements UseCase<Response> {
  constructor(private readonly repository: UsersRepository) {}

  public async execute(id: string): Promise<Response> {
    try {
      await this.repository.remove(id);
      return {
        message: `Deleted user ${id} successfully.`,
        code: 200,
      };
    } catch (error) {
      console.error('🚀 ~ DeletedUserUseCase ~ execute ~ error:', error);
      throw new Error('Error system');
    }
  }
}
