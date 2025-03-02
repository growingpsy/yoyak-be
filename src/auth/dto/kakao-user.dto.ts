import { IsString, IsEmail, IsOptional } from 'class-validator';

export class KakaoUserDto {
  @IsString()
  kakaoId!: string;  // ✅ 필드명 변경

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  nickname!: string;
}