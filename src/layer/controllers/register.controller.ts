import { Controller, Post, Body, BadRequestException, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto, VerifyEmailDto } from '../dtos/user.dto'; 
import { RegisterService } from '../services/register.service'; 

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // 회원가입
  @Post()
  async register(@Req() req: Request, @Res() res: Response) {
    // 회원가입 정보 수집
    const createUserDto: CreateUserDto = req.body;
    const { user_name, user_nick, user_email, user_pwd, confirmPassword } = createUserDto;

    // 비밀번호 일치 여부 확인
    if (user_pwd !== confirmPassword) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    // 이메일 중복 확인
    const emailExists = await this.registerService.checkEmailExists(user_email);
    if (emailExists) {
      return res.status(400).json({ message: '이미 가입된 이메일 주소입니다.' });
    }

    // 인증 코드 발송
    const verificationCode = await this.registerService.sendVerificationCode(user_email);

    // 사용자 생성
    const user = await this.registerService.createUser({
      user_name,
      user_nick,
      user_email,
      user_pwd,
      email_verified: false, 
    });

    return res.status(201).json({ user, verificationCode });
  }

  // 이메일 인증 처리
  @Post('verify-email')
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    const verifyEmailDto: VerifyEmailDto = req.body;
    const { user_email, verification_code } = verifyEmailDto;

    // 인증 코드 확인 - Default: false
    const isVerified = await this.registerService.verifyEmailCode(user_email, verification_code);
    if (!isVerified) {
      return res.status(400).json({ message: '인증 실패' });
    }

    // 이메일 인증 상태 업데이트
    await this.registerService.updateEmailVerified(user_email);

    // 인증 성공
    return res.status(200).json({ message: '인증 성공' });
  }
}
