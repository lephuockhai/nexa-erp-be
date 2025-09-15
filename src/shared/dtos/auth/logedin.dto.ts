import { CreatedUserDto } from '../users/created-user.dto';

export class LogedinDto {
  access_token: string;
  refresh_token: string;
  user: CreatedUserDto;
}
