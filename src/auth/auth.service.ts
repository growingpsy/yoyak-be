import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto, VerifyEmailDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { KakaoUserDto } from './dto/kakao-user.dto';

@Injectable()
export class AuthService {
  private verificationCodes: Map<string, string> = new Map();

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // 로그인
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { user_email: loginDto.user_email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.user_pwd, user.user_pwd);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const token = await this.jwtService.signAsync({
      sub: user.user_id,
      email: user.user_email,
    });

    return {
      accessToken: token,
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_nick: user.user_nick,
      email_verified: user.email_verified,
    };
  }

  // 회원가입
  async register(createUserDto: CreateUserDto) {
    const { user_name, user_nick, user_email, user_pwd, confirmPassword } = createUserDto;

    if (user_pwd !== confirmPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const existingUser = await this.authRepository.findByEmail(user_email);
    if (existingUser) {
      throw new BadRequestException('이미 가입된 이메일 주소입니다.');
    }

    const verificationCode = await this.sendVerificationCode(user_email);
    const hashedPassword = await bcrypt.hash(user_pwd, 10);

    const user = await this.authRepository.createUser({
      user_name,
      user_nick,
      user_email,
      user_pwd: hashedPassword,
      email_verified: false,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.user_id,
      email: user.user_email,
    });

    return {
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_nick: user.user_nick,
      email_verified: user.email_verified,
      accessToken,
      verificationCode,
    };
  }

  // 이메일 인증
  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { user_email, verification_code } = verifyEmailDto;
    const storedCode = this.verificationCodes.get(user_email);

    if (storedCode !== verification_code) {
      throw new BadRequestException('인증 코드가 일치하지 않습니다.');
    }

    await this.authRepository.updateEmailVerified(user_email);

    return { message: '이메일 인증 성공' };
  }

  // 이메일 인증 코드 전송
  private async sendVerificationCode(user_email: string): Promise<string> {
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
    return verificationCode;
  }

  // 카카오 로그인
  async kakaoLogin(kakaoUser: KakaoUserDto) {
    if (!kakaoUser.email) {
      throw new BadRequestException('카카오 계정의 이메일 정보가 필요합니다.');
    }

    let user = await this.authRepository.findByEmail(kakaoUser.email);

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await this.authRepository.createUser({
        user_email: kakaoUser.email,
        user_name: kakaoUser.nickname,
        user_nick: kakaoUser.nickname,
        user_pwd: hashedPassword,
        email_verified: true,
        kakao_id: kakaoUser.kakaoId,
      });
    }

    const accessToken = this.jwtService.sign({
      email: user.user_email,
      sub: user.user_id,
    });

    return {
      accessToken,
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_nick: user.user_nick,
    };
  }
}