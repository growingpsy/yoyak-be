import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 이메일 중복 확인
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { user_email: email },
    });
  }

  // 새로운 사용자 생성
  async createUser(data: { 
    user_name: string; 
    user_nick: string; 
    user_email: string; 
    user_pwd: string; 
    email_verified: boolean;
  }) {
    return this.prisma.user.create({ 
        data: {
            user_name: data.user_name,
            user_nick: data.user_nick,
            user_email: data.user_email,
            user_pwd: data.user_pwd,
            email_verified: data.email_verified,
            created_at: new Date(),
        },
    });
  }

  // 메일 인증 여부 업데이트
  async updateEmailVerified(user_email: string) {
    return this.prisma.user.update({
      where: { user_email },
      data: { email_verified: true,
      updated_at: new Date(),
      },
    });
  }
}