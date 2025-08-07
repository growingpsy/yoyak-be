import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
     
export class LoginDto {
  @ApiProperty({
    description: '사용자의 이메일 주소',
    example: 'yoyak.lib@gmail.com',
  })
  @IsEmail()
  user_email!: string;

  @ApiProperty({
    description: '사용자의 비밀번호 (최소 6자 이상)',
    example: 'yoyak123!',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  user_pwd!: string;
}
