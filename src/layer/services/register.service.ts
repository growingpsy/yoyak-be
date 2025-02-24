import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, VerifyEmailDto } from '../dtos/user.dto';
import { RegisterRepository } from '../repositories/register.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RegisterService {
  private verificationCodes: Map<string, string> = new Map();

  constructor(private readonly registerRepository: RegisterRepository) {}

  // 회원가입
  async register(createUserDto: CreateUserDto) {
    const { user_name, user_nick, user_email, user_pwd, confirmPassword } = createUserDto;

    // 비밀번호 일치 여부 확인
    if (user_pwd !== confirmPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    // 이메일 중복 확인
    if (await this.checkEmailExists(user_email)) {
      throw new BadRequestException('이미 가입된 이메일 주소입니다.');
    }

    // 인증 코드 발송
    const verificationCode = await this.sendVerificationCode(user_email);

    // 사용자 생성
    const user = await this.createUser({
      user_name,
      user_nick,
      user_email,
      user_pwd,
      email_verified: false,
    });

    return { user, verificationCode };
  }

  // 이메일 인증 처리
  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { user_email, verification_code } = verifyEmailDto;

    // 인증 코드 확인 - Default: false
    if (!(await this.verifyEmailCode(user_email, verification_code))) {
      throw new BadRequestException('인증 실패');
    }

    // 이메일 인증 상태 업데이트
    await this.updateEmailVerified(user_email);

    return { message: '인증 성공' };
  }

  // 이메일 중복 여부 확인
  async checkEmailExists(user_email: string): Promise<boolean> {
    const user = await this.registerRepository.findByEmail(user_email);
    return !!user;
  }

  // 새로운 사용자 생성
  async createUser(createUserDto: CreateUserDto) {
    const { user_name, user_nick, user_email, user_pwd, email_verified } = createUserDto;
    return await this.registerRepository.create({
      user_name,
      user_nick,
      user_email,
      user_pwd,
      email_verified,
    });
  }

  // 인증 코드 발급 및 이메일 전송
  async sendVerificationCode(user_email: string): Promise<string> {
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.verificationCodes.set(user_email, verificationCode);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'swuweb0320@gmail.com',
        pass: 'wbsd ylod ahov hhat',
      },
    });

    const mailOptions = {
      from: 'swuweb0320@gmail.com',
      to: user_email,
      subject: '요약러리 이메일 인증 코드',
      text: `요약러리의 인증 코드는 ${verificationCode} 입니다.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${user_email}: ${verificationCode}`);
    return verificationCode;
  }

  // 이메일 인증 코드 검증
  async verifyEmailCode(user_email: string, verification_code: string): Promise<boolean> {
    const storedCode = this.verificationCodes.get(user_email);
    return storedCode === verification_code;
  }

  // 이메일 인증 상태 업데이트
  async updateEmailVerified(user_email: string): Promise<void> {
    await this.registerRepository.updateEmailVerified(user_email);
  }
}
