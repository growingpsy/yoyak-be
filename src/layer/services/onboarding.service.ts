import { Injectable, NotFoundException } from '@nestjs/common';
import { OnboardingRepository } from '../repositories/onboarding.repository';
import { 
  OnboardingDto
} from '../dtos/onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(private readonly onboardingRepository: OnboardingRepository) {}

  // 1단계: 콘텐츠 유형 선택 저장
  async saveStep1(userId: number, dto: OnboardingDto) {
    await this.onboardingRepository.saveStep1(userId, dto);
    
    return {
      message: '1단계 콘텐츠 유형 선택이 저장되었습니다.',
      step: 1,
      completed: true
    };
  }

  // 2단계: 선호 분위기 선택 저장
  async saveStep2(userId: number, dto: OnboardingDto) {
    await this.onboardingRepository.saveStep2(userId, dto);
    
    return {
      message: '2단계 선호 분위기 선택이 저장되었습니다.',
      step: 2,
      completed: true
    };
  }

  // 3단계: 분석 완료 처리
  async completeOnboarding(userId: number, dto: OnboardingDto) {
    await this.onboardingRepository.completeOnboarding(userId, dto);
    
    // 추천 콘텐츠 개수 조회
    const recommendedContents = await this.onboardingRepository.getRecommendedContents(userId, 5);
    
    return {
      onboarding_completed: true,
      recommended_count: recommendedContents.length,
      message: '취향 분석 완료! 당신만의 맞춤형 콘텐츠를 준비했습니다.',
      step: 3,
      completed: true
    };
  }

  // 온보딩 진행률 조회
  async getOnboardingProgress(userId: number) {
    return this.onboardingRepository.getOnboardingProgress(userId);
  }

  // 온보딩 완료 여부 확인
  async isOnboardingCompleted(userId: number): Promise<boolean> {
    return this.onboardingRepository.isOnboardingCompleted(userId);
  }

  // 온보딩 결과 조회
  async getOnboardingResult(userId: number) {
    const onboarding = await this.onboardingRepository.getOnboarding(userId);
    
    if (!onboarding) {
      throw new NotFoundException('온보딩 정보를 찾을 수 없습니다.');
    }

    if (!onboarding.onboarding_completed) {
      throw new NotFoundException('온보딩이 아직 완료되지 않았습니다.');
    }

    const recommendedContents = await this.onboardingRepository.getRecommendedContents(userId, 10);

    return {
      onboarding_completed: onboarding.onboarding_completed,
      recommended_count: recommendedContents.length,
      message: '취향 분석 완료! 당신만의 맞춤형 콘텐츠를 준비했습니다.',
      content_types: onboarding.content_types as any,
      preferred_moods: onboarding.preferred_genres as string[],
    };
  }

  // 추천 콘텐츠 조회
  async getRecommendedContents(userId: number, limit: number = 10) {
    return this.onboardingRepository.getRecommendedContents(userId, limit);
  }

  // 온보딩 정보 조회
  async getOnboarding(userId: number) {
    const onboarding = await this.onboardingRepository.getOnboarding(userId);
    
    if (!onboarding) {
      throw new NotFoundException('온보딩 정보를 찾을 수 없습니다.');
    }

    return onboarding;
  }
} 