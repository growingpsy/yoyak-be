import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto, VerifyEmailDto, SendVerificationCodeDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { ResponseDto } from '../layer/dtos/response.dto';
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
async login(loginDto: LoginDto): Promise<ResponseDto<any>> {
  console.log('[로그인 요청] Email:', loginDto.user_email);

  try {
    const user = await this.prisma.user.findUnique({
      where: { user_email: loginDto.user_email },
    });

    if (!user) {
      console.log('[로그인 실패] 존재하지 않는 이메일:', loginDto.user_email);
      return new ResponseDto(404, '이메일이 존재하지 않습니다.', null);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.user_pwd, user.user_pwd);
    if (!isPasswordValid) {
      console.log('[로그인 실패] 비밀번호 불일치:', loginDto.user_email);
      return new ResponseDto(401, '비밀번호가 일치하지 않습니다.', null);
    }

    const payload = { sub: user.user_id, email: user.user_email };
    const token = await this.jwtService.signAsync(payload);

    console.log('[로그인 성공] 사용자 ID:', user.user_id);

    return new ResponseDto(200, '로그인 성공', {
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_nick: user.user_nick,
      email_verified: user.email_verified,
      access_token: token,
    });
  } catch (error) {
    console.error('[로그인 오류]', error);
    return new ResponseDto(500, '서버 오류가 발생했습니다.', null);
  }
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

    const verificationCode = await this.sendVerificationCode({ user_email });
    const hashedPassword = await bcrypt.hash(user_pwd, 10);

    const user = await this.authRepository.createUser({
      user_name,
      user_nick,
      user_email,
      user_pwd: hashedPassword,
      email_verified: false,
    });

    console.log('생성된 user:', user);
    console.log('user_id의 타입:', typeof user.user_id, '값:', user.user_id);
    return { user, verificationCode };
  }

  // 이메일 인증
  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { user_email, verification_code } = verifyEmailDto;
    const storedCode = this.verificationCodes.get(user_email);

    if (storedCode !== verification_code) {
      throw new BadRequestException('인증 실패');
    }

    await this.authRepository.updateEmailVerified(user_email);

    return { message: '인증 성공' };
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
      from: this.configService.get<string>('EMAIL_USER'),
      to: user_email,
      subject: '이메일 인증 코드',
      text: `인증 코드: ${verificationCode}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      return '인증 코드가 이메일로 전송되었습니다.';
    } catch (error) {
      throw new Error('이메일 전송 중 오류가 발생했습니다.');
    }
  }
}