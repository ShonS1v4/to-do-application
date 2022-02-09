import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'superEmail@mail.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'SuperMegaPassword123@',
    description: 'User password',
  })
  password: string;
}
