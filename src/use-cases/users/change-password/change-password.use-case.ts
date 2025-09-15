import { UseCase } from '@/core/base/use-case';
import { CreateUserMapper } from '@/core/domain/mappers/users/create-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { ChangePasswordDto } from '@/shared/dtos/users/change-password.dto';
import { HashedPassword, VerifiedPassword } from '@/shared/utils/password';
type Response = {
  ok: boolean;
  message: string;
};
export class ChangePasswordUseCase implements UseCase<Response> {
  private createUserMapper: CreateUserMapper;
  constructor(private readonly repository: UsersRepository) {
    this.createUserMapper = new CreateUserMapper();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(data: ChangePasswordDto): Promise<Response> {
    try {
      const { user_id, new_password, old_password } = data;
      const userDoc = await this.repository.findOne({ id: user_id });
      if (!userDoc) {
        return {
          ok: false,
          message: `Change password failure.`,
        };
      }
      const matchedPassword = VerifiedPassword(
        old_password,
        userDoc.password_hash,
      );
      if (!matchedPassword) {
        return {
          ok: false,
          message: `Old password is incorrect.`,
        };
      }
      const hashedPassword = HashedPassword(new_password);
      if (!hashedPassword) {
        return {
          ok: false,
          message: `Change password failure.`,
        };
      }
      await this.repository.update(userDoc.id, {
        password_hash: hashedPassword,
      });
      return {
        message: `Changed password successfully.`,
        ok: true,
      };
    } catch (error) {
      console.error('🚀 ~ ChangePasswordUseCase ~ execute ~ error:', error);
      return {
        ok: false,
        message: `Change password failure.`,
      };
    }
  }
}
