import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 

@Injectable()
export class RegisterRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 이메일 중복 확인
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }, // 이메일을 기준으로 사용자 검색
    });
  }

  // 새로운 사용자 생성
  async create(data: { user_name: string; user_nick: string; user_email: string; user_pwd: string, email_verified }) {
    return this.prisma.user.create({
      data,
    });
  }

  // 이메일 인증 여부 확인
  async updateEmailVerified(user_email: string) {
    return this.prisma.user.update({
      where: { user_email },
      data: { email_verified: true },
    });
  }
}
