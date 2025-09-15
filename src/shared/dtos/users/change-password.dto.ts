import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'id123123',
  })
  user_id: string;

  @ApiProperty({
    example: 'oldpassword',
  })
  new_password: string;

  @ApiProperty({
    example: 'newpassword',
  })
  old_password: string;
}
