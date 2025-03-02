import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from '../layer/dtos/response.dto';
import { CreateUserDto, VerifyEmailDto, SendVerificationCodeDto } from './dto/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {
    return new ResponseDto(200, '카카오 로그인 페이지로 이동합니다', null);
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req) {
    const result = await this.authService.kakaoLogin(req.user);
    return new ResponseDto(200, '카카오 로그인 성공', result);
  }
}