import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    example: 'abc...xyz',
  })
  @IsString()
  refreshToken: string;
}
