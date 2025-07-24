import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNotEmpty, IsObject, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class OnboardingDto {
  // 1단계: 콘텐츠 유형별 선택된 장르들
  @ApiProperty({ 
    description: '영화 장르 선택 (중복 가능)', 
    example: ['액션', 'SF', '로맨스'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  movie?: string[];

  @ApiProperty({ 
    description: '드라마 장르 선택 (중복 가능)', 
    example: ['멜로', '스릴러'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  drama?: string[];

  @ApiProperty({ 
    description: 'TV프로그램 장르 선택 (중복 가능)', 
    example: ['예능', '토크쇼'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tv?: string[];

  // 2단계: 선호 분위기 선택
  @ApiProperty({ 
    description: '선호하는 분위기들 (중복 선택 가능)', 
    example: ['가벼운', '신나는', '따뜻한'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferred_moods?: string[];

  // 3단계: 분석 완료
  @ApiProperty({ 
    description: '분석 진행률', 
    example: 100,
    required: false
  })
  @IsNumber()
  @IsOptional()
  progress?: number;

  @ApiProperty({ 
    description: '분석 완료 여부', 
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

// 온보딩 진행률 조회 응답
export class OnboardingProgressDto {
  @ApiProperty({ description: '현재 단계', example: 1 })
  current_step!: number;

  @ApiProperty({ description: '1단계 완료 여부', example: true })
  step1_completed!: boolean;

  @ApiProperty({ description: '2단계 완료 여부', example: true })
  step2_completed!: boolean;

  @ApiProperty({ description: '3단계 완료 여부', example: false })
  step3_completed!: boolean;

  @ApiProperty({ description: '전체 진행률', example: 66 })
  total_progress!: number;
}

// 온보딩 결과 응답
export class OnboardingResultDto {
  @ApiProperty({ description: '온보딩 완료 여부', example: true })
  onboarding_completed!: boolean;

  @ApiProperty({ description: '추천 콘텐츠 개수', example: 5 })
  recommended_count!: number;

  @ApiProperty({ description: '완료 메시지', example: '취향 분석 완료! 당신만의 맞춤형 콘텐츠를 준비했습니다.' })
  message!: string;

  @ApiProperty({ 
    description: '선택된 콘텐츠 유형들', 
    example: { movie: ['액션', 'SF'], drama: ['멜로'], tv: ['예능'] }
  })
  content_types!: object;

  @ApiProperty({ 
    description: '선호 분위기들', 
    example: ['가벼운', '신나는', '따뜻한']
  })
  preferred_moods!: string[];
} 