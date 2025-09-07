import { ApiProperty } from '@nestjs/swagger';

export class SendOTPDto {
  @ApiProperty({
    example: '0123456678',
  })
  phone: string;
}
