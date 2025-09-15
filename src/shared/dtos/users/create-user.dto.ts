import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  id?: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;

  @ApiProperty({
    example: 'USER',
  })
  role: Role;
}
