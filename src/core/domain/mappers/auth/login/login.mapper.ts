import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { LoginDto } from '@/shared/dtos/auth/login.dto';
import { validateEmail } from '@/shared/utils/email';
import { validatePhone } from '@/shared/utils/phone';

export class LoginMapper extends Mapper<LoginDto, UserEntity> {
  public mapFrom(data: LoginDto): UserEntity {
    const user = new UserEntity();

    if (validatePhone(data.emailOrPhone)) {
      user.phone = data.emailOrPhone;
    } else if (validateEmail(data.emailOrPhone)) {
      user.email = data.emailOrPhone;
    }

    return user;
  }

  public mapTo(data: UserEntity): LoginDto {
    const user = new LoginDto();

    return user;
  }
}
