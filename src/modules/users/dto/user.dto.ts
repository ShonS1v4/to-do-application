import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Tinker', description: 'User name identifier' })
  userName: string;

  @ApiProperty({
    example: 'SuperMegaPassword123@',
    description: 'User password',
  })
  password: string;
}
