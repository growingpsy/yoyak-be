import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 이메일로 사용자 찾기
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { user_email: email },
    });
  }

  // 카카오ID로 사용자 찾기 (카카오 로그인용)
  async findByKakaoId(kakaoId: string) {
    return this.prisma.user.findUnique({
      where: { kakao_id: kakaoId },
    });
  }

  // 새로운 사용자 생성 (일반 가입 + 카카오 간편가입 공통 처리)
  async createUser(data: {
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
