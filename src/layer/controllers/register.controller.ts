import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto, VerifyEmailDto } from '../dtos/user.dto';
import { RegisterService } from '../services/register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // 회원가입
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerService.register(createUserDto);
  }

  // 이메일 인증 처리
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.registerService.verifyEmail(verifyEmailDto);
  }
}