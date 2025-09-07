import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';

export class UpdateUserMapper extends Mapper<UpdateUserDto, UserEntity> {
  public mapFrom(data: UpdateUserDto): UserEntity {
    const user = new UserEntity();

    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.is_active = data.is_active;

    return user;
  }

  public mapTo(data: UserEntity): UpdateUserDto {
    const user = new UpdateUserDto();

    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.is_active = data.is_active;

    return user;
  }
}
