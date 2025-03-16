import { IsString, IsEmail, IsBoolean, IsNotEmpty, MinLength, ValidateIf, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '사용자 이름', example: '요약슈니' })
  @IsString()
  @IsNotEmpty()
  readonly user_name!: string;

  @ApiProperty({ description: '사용자 닉네임', example: 'yoyakswuni' })
  @IsString()
  @IsNotEmpty()
  readonly user_nick!: string;

  @ApiProperty({ description: '사용자 이메일', example: 'test@gmail.com' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty()
  readonly user_email!: string;

  @ApiProperty({ description: '이메일 인증 여부', example: false, required: false })
  @IsBoolean()
  readonly email_verified?: boolean = false;

  @ApiProperty({ description: '사용자 비밀번호', example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  readonly user_pwd!: string;

  @ApiProperty({ description: '비밀번호 확인', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.user_pwd)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: '비밀번호 확인은 비밀번호와 일치해야 합니다.' })
  readonly confirmPassword!: string;

  @ApiProperty({ description: '비밀번호와 비밀번호 확인이 일치하는지 확인' })
  @ValidateIf((o) => o.user_pwd && o.confirmPassword)
  @Matches(/^(?=.*[a-zA-Z0-9!@#$%^&*]).{6,}$/, { message: '비밀번호와 비밀번호 확인이 일치해야 합니다.' })
  readonly confirmPasswordCheck?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ description: '사용자 이름', example: '요약슈니', required: false })
  @IsString()
  @IsNotEmpty()
  readonly user_name?: string;

  @ApiProperty({ description: '사용자 닉네임', example: 'yoyakswuni', required: false })
  @IsString()
  @IsNotEmpty()
  readonly user_nick?: string;

  @ApiProperty({ description: '사용자 이메일', example: 'test@gmail.com', required: false })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  readonly user_email?: string;

  @ApiProperty({ description: '이메일 인증 여부', example: false, required: false })
  @IsBoolean()
  readonly email_verified?: boolean;

  @ApiProperty({ description: '사용자 비밀번호', example: 'password123', required: false })
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  readonly user_pwd?: string;
}

export class UserResponseDto {
  @ApiProperty({ description: '사용자 ID', example: 1 })
  user_id!: number;

  @ApiProperty({ description: '사용자 이름', example: '요약슈니' })
  user_name!: string;

  @ApiProperty({ description: '사용자 닉네임', example: 'yoyakswuni' })
  user_nick!: string;

  @ApiProperty({ description: '사용자 이메일', example: 'test@gmail.com' })
  user_email!: string;

  @ApiProperty({ description: '이메일 인증 여부', example: false })
  email_verified!: boolean;

  @ApiProperty({ description: '사용자 비밀번호', example: 'password123' })
  user_pwd!: string;

  @ApiProperty({ description: '밴 카운트', example: 0 })
  ban_count!: number;

  @ApiProperty({ description: '계정 생성 일자', example: new Date() })
  created_at!: Date;

  @ApiProperty({ description: '계정 수정 일자', example: new Date() })
  updated_at!: Date;
}

export class SendVerificationCodeDto {
  @ApiProperty({ description: '이메일 인증 코드 전송 대상 이메일', example: 'test@gmail.com' })
  @IsEmail({}, { message: '인증코드 전송에 실패하였습니다.' })
  @IsNotEmpty()
  readonly user_email!: string;
}

export class VerifyEmailDto {
  @ApiProperty({ description: '이메일 인증 대상 이메일', example: 'test@gmail.com' })
  @IsEmail({}, { message: '인증코드가 일치하지 않습니다.' })
  @IsNotEmpty()
  readonly user_email!: string;

  @ApiProperty({ description: '사용자가 받은 인증 코드', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '인증 코드는 필수입니다.' })
  readonly verification_code!: string;
}