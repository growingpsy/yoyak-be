import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { RegisterRepository } from '../repositories/register.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RegisterService {
  private verificationCodes: Map<string, string> = new Map();

  constructor(private readonly registerRepository: RegisterRepository) {}

  // 이메일 중복 여부 확인
  async checkEmailExists(user_email: string): Promise<boolean> {
    // 해당 이메일을 가진 사용자가 있는지 확인
    const user = await this.registerRepository.findByEmail(user_email);
    return !!user; // 사용자가 있으면 true, 없으면 false
  }

  // 새로운 사용자 생성
  async createUser(createUserDto: CreateUserDto) {
    const { user_name, user_nick, user_email, user_pwd, email_verified } = createUserDto;
    // 사용자 정보 저장
    const user = await this.registerRepository.create({
      user_name,
      user_nick,
      user_email,
      user_pwd,
      email_verified,
    });
    return user; 
  }

  // 인증 코드 발급 및 이메일 전송
  async sendVerificationCode(user_email: string): Promise<string> {
    // 랜덤한 6자리 인증 코드 생성
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    // 이메일과 인증 코드 매핑
    this.verificationCodes.set(user_email, verificationCode);

    // Nodemailer 
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'swuweb0320@gmail.com', 
        pass: 'wbsd ylod ahov hhat', 
      },
    });

    // 이메일 내용 
    const mailOptions = {
      from: 'swuweb0320@gmail.com', 
      to: user_email, 
      subject: '이메일 인증 코드',
      text: `요약러리의 인증 코드는 ${verificationCode} 입니다.`,
    };

    // 인증 코드 이메일 발송
    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${user_email}: ${verificationCode}`);
    return verificationCode;
  }

  // 이메일 인증 코드 검증
  async verifyEmailCode(user_email: string, verification_code: string): Promise<boolean> {
    // 저장된 인증 코드와 비교
    const storedCode = this.verificationCodes.get(user_email);
    return storedCode === verification_code; // 일치하면 true, 아니면 false
  }

  // 이메일 인증 상태 업데이트
  async updateEmailVerified(user_email: string): Promise<void> {
    await this.registerRepository.updateEmailVerified(user_email);
  }
}
