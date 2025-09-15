import { ApiProperty } from '@nestjs/swagger';

export class CreateOTPDto {
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @ApiProperty({
    example: '123123',
  })
  code: string;
}
