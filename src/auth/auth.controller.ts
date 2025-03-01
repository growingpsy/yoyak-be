import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto, VerifyEmailDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from '../layer/dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return new ResponseDto(200, '로그인 성공', result);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    return new ResponseDto(201, '회원가입 성공', result);
  }

  @Post('verify-email')
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