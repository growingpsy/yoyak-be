import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class KakaoUserDto {
  @ApiProperty({
    description: '카카오 사용자 고유 ID',
    example: '123456789',
  })
  @IsString()
  kakaoId!: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: 'kakao_user',
  })
  @IsString()
  nickname!: string;
}