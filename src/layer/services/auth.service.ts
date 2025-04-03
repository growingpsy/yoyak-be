import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginDto } from '../dtos/login.dto';
import { CreateUserDto, VerifyEmailDto, SendVerificationCodeDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../../prisma/prisma.service';
import { KakaoUserDto } from '../dtos/kakao-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private verificationCodes: Map<string, string> = new Map();

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
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
      user_id: user.user_id,
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
    const { user_name, user_nick, user_email, user_pwd, confirmPassword, verificationCode } = createUserDto;

    if (user_pwd !== confirmPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const storedVerificationCode = this.verificationCodes.get(user_email); // 이메일로 전송된 인증 코드 조회
    if (verificationCode !== storedVerificationCode) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    const email_verified = true;

    const existingUser = await this.authRepository.findByEmail(user_email);
    if (existingUser) {
      throw new BadRequestException('이미 가입된 이메일 주소입니다.');
    }

    const hashedPassword = await bcrypt.hash(user_pwd, 10);

    const user = await this.authRepository.createUser({
      user_name,
      user_nick,
      user_email,
      user_pwd: hashedPassword,
      email_verified,
    });

    const accessToken = await this.jwtService.signAsync({
      user_id: user.user_id,
      email: user.user_email,
    });

    return {
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_nick: user.user_nick,
      email_verified: user.email_verified,
      accessToken,
    };
  }

  // 이메일 인증 코드 전송
  async sendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto): Promise<string> {
    const { user_email } = sendVerificationCodeDto;
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    this.verificationCodes.set(user_email, verificationCode);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: `요약러리 <${this.configService.get<string>('EMAIL_USER')}>`, // 보내는 사람 이름 설정
      to: user_email,
      subject: '요약러리 이메일 인증 코드',
      html: `<p>요약러리의 이메일 인증 코드는 <strong style="font-size: 18px;">${verificationCode}</strong> 입니다.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return '인증 코드가 이메일로 전송되었습니다.';
    } catch (error) {
      throw new Error('이메일 전송 중 오류가 발생했습니다.');
    }
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
      user_id: user.user_id,
      email: user.user_email,
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