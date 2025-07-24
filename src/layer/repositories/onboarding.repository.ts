import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OnboardingDto } from '../dtos/onboarding.dto';

@Injectable()
export class OnboardingRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 1단계: 콘텐츠 유형 선택 저장
  async saveStep1(userId: number, dto: OnboardingDto) {
    const contentTypesJson = {
      movie: dto.movie || [],
      drama: dto.drama || [],
      tv: dto.tv || []
    };

    return this.prisma.onboarding.upsert({
      where: { user_id: userId },
      update: {
        content_types: contentTypesJson,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        content_types: contentTypesJson,
        preferred_genres: [],
        onboarding_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  // 2단계: 선호 분위기 선택 저장
  async saveStep2(userId: number, dto: OnboardingDto) {
    return this.prisma.onboarding.upsert({
      where: { user_id: userId },
      update: {
        preferred_genres: dto.preferred_moods || [],
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        content_types: {},
        preferred_genres: dto.preferred_moods || [],
        onboarding_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  // 3단계: 분석 완료 처리
  async completeOnboarding(userId: number, dto: OnboardingDto) {
    return this.prisma.onboarding.update({
      where: { user_id: userId },
      data: {
        onboarding_completed: dto.completed || true,
        updated_at: new Date(),
      },
    });
  }

  // 온보딩 정보 조회
  async getOnboarding(userId: number) {
    return this.prisma.onboarding.findUnique({
      where: { user_id: userId },
    });
  }

  // 온보딩 완료 여부 확인
  async isOnboardingCompleted(userId: number) {
    const onboarding = await this.prisma.onboarding.findUnique({
      where: { user_id: userId },
      select: { onboarding_completed: true },
    });
    return onboarding?.onboarding_completed || false;
  }

  // 추천 콘텐츠 조회 (취향 기반)
  async getRecommendedContents(userId: number, limit: number = 10) {
    const onboarding = await this.getOnboarding(userId);
    if (!onboarding || !onboarding.onboarding_completed) {
      return [];
    }

    const contentTypes = onboarding.content_types as any;
    const preferredGenres = onboarding.preferred_genres as string[];

    // 콘텐츠 유형별로 추천 콘텐츠 조회
    const whereConditions: any[] = [];
    
    if (contentTypes.movie?.length > 0) {
      whereConditions.push({
        content_type: 'movie',
        content_genre: { in: contentTypes.movie }
      });
    }
    
    if (contentTypes.drama?.length > 0) {
      whereConditions.push({
        content_type: 'drama',
        content_genre: { in: contentTypes.drama }
      });
    }

    if (whereConditions.length === 0) {
      return [];
    }

    const recommendedContents = await this.prisma.content.findMany({
      where: {
        OR: whereConditions
      },
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    return recommendedContents;
  }

  // 온보딩 진행률 계산
  async getOnboardingProgress(userId: number) {
    const onboarding = await this.getOnboarding(userId);
    
    if (!onboarding) {
      return {
        current_step: 1,
        step1_completed: false,
        step2_completed: false,
        step3_completed: false,
        total_progress: 0,
      };
    }

    const contentTypes = onboarding.content_types as any;
    const preferredGenres = onboarding.preferred_genres as string[];

    const step1_completed = contentTypes && (
      (contentTypes.movie && contentTypes.movie.length > 0) ||
      (contentTypes.drama && contentTypes.drama.length > 0) ||
      (contentTypes.tv && contentTypes.tv.length > 0)
    );

    const step2_completed = preferredGenres && preferredGenres.length > 0;
    const step3_completed = onboarding.onboarding_completed;

    let current_step = 1;
    if (step1_completed) current_step = 2;
    if (step2_completed) current_step = 3;
    if (step3_completed) current_step = 3;

    const total_progress = Math.round(
      ((step1_completed ? 1 : 0) + (step2_completed ? 1 : 0) + (step3_completed ? 1 : 0)) / 3 * 100
    );

    return {
      current_step,
      step1_completed,
      step2_completed,
      step3_completed,
      total_progress,
    };
  }
} 