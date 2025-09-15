import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '01234567689',
  })
  emailOrPhone: string;

  @ApiProperty({
    example: '123123',
  })
  password: string;
}
