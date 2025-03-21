import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from '../dtos/response.dto';
import { CreateUserDto, VerifyEmailDto, SendVerificationCodeDto } from '../dtos/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '사용자가 로그인합니다.' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return new ResponseDto(200, '로그인 성공', result);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    return new ResponseDto(201, '회원가입 성공', result);
  }

  @Post('send-email')
  @ApiOperation({ summary: '이메일 인증 코드 전송', description: '사용자에게 인증 코드를 이메일로 전송합니다.' })
  @ApiResponse({ status: 200, description: '이메일 인증 코드 전송 성공' })
  @ApiResponse({ status: 400, description: '잘못된 이메일 주소' })
  async sendEmail(@Body() sendVerificationCodeDto: SendVerificationCodeDto) {
    return this.authService.sendVerificationCode(sendVerificationCodeDto);
  }

  @Post('verify-email')
  @ApiOperation({ summary: '이메일 인증', description: '사용자가 받은 인증 코드를 입력하여 이메일을 인증합니다.' })
  @ApiResponse({ status: 200, description: '이메일 인증 성공' })
  @ApiResponse({ status: 400, description: '인증 코드 불일치' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const result = await this.authService.verifyEmail(verifyEmailDto);
    return new ResponseDto(200, '이메일 인증 성공', result);
  }

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인', description: '카카오 로그인 페이지로 리다이렉트합니다.' })
  @ApiResponse({ status: 200, description: '카카오 로그인 페이지로 이동합니다.' })
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {
    return new ResponseDto(200, '카카오 로그인 페이지로 이동합니다', null);
  }

  @Get('kakao/callback')
  @ApiOperation({ summary: '카카오 로그인 콜백', description: '카카오 로그인 후 콜백을 처리합니다.' })
  @ApiResponse({ status: 200, description: '카카오 로그인 성공' })
  @ApiResponse({ status: 401, description: '카카오 인증 실패' })
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req) {
    const result = await this.authService.kakaoLogin(req.user);
    return new ResponseDto(200, '카카오 로그인 성공', result);
  }
}