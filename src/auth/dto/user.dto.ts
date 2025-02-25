import { IsString, IsEmail, IsBoolean, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly user_name!: string;

  @IsString()
  @IsNotEmpty()
  readonly user_nick!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly user_email!: string;

  @IsBoolean()
  readonly email_verified?: boolean = false;

  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  readonly user_pwd!: string;

  @IsString()
  @IsNotEmpty()
  readonly confirmPassword!: string;
}

export class VerifyEmailDto {
  readonly user_email!: string;
  readonly verification_code!: string;
} 