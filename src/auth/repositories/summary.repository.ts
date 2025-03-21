import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SummaryRepository {
  constructor(private readonly prisma: PrismaService) {}

 



  async createSummary(data: {
    user_name: string;
    user_nick: string;
    user_email: string;
    user_pwd: string;
    email_verified: boolean;
    kakao_id?: string;
  }) {
    return this.prisma.user.create({
      data: {
        user_name: data.user_name,
        user_nick: data.user_nick,
        user_email: data.user_email,
        user_pwd: data.user_pwd,
        email_verified: data.email_verified,
        kakao_id: data.kakao_id ?? null,
        created_at: new Date(),
      },
    });
  }

  // 이메일 인증 완료 처리
  async updateEmailVerified(user_email: string) {
    return this.prisma.user.update({
      where: { user_email },
      data: {
        email_verified: true,
      },
    });
  }
}
