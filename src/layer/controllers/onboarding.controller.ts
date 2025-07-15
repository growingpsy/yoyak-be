import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { OnboardingService } from '../services/onboarding.service';
import { 
  OnboardingDto, 
  OnboardingProgressDto, 
  OnboardingResultDto 
} from '../dtos/onboarding.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from '../dtos/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('step1')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '1단계: 콘텐츠 유형 선택', 
    description: '사용자가 선호하는 콘텐츠 유형(영화, 드라마, TV프로그램)과 장르를 선택합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Step 1 saved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async saveStep1(@Req() req, @Body() dto: OnboardingDto) {
    const userId = req.user.user_id;
    const result = await this.onboardingService.saveStep1(userId, dto);
    return new ResponseDto(200, 'Step 1 saved successfully', result);
  }

  @Post('step2')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '2단계: 선호 분위기 선택', 
    description: '사용자가 선호하는 분위기를 선택합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Step 2 saved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async saveStep2(@Req() req, @Body() dto: OnboardingDto) {
    const userId = req.user.user_id;
    const result = await this.onboardingService.saveStep2(userId, dto);
    return new ResponseDto(200, 'Step 2 saved successfully', result);
  }

  @Post('step3')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '3단계: 분석 완료', 
    description: '온보딩 분석을 완료하고 추천 콘텐츠를 생성합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Step 3 completed successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async completeOnboarding(@Req() req, @Body() dto: OnboardingDto) {
    const userId = req.user.user_id;
    const result = await this.onboardingService.completeOnboarding(userId, dto);
    return new ResponseDto(200, 'Onboarding completed successfully', result);
  }

  @Get('progress')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '온보딩 진행률 조회', 
    description: '현재 온보딩 진행 상황을 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Progress retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async getOnboardingProgress(@Req() req): Promise<ResponseDto<OnboardingProgressDto>> {
    const userId = req.user.user_id;
    const result = await this.onboardingService.getOnboardingProgress(userId);
    return new ResponseDto(200, 'Progress retrieved successfully', result);
  }

  @Get('completed')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '온보딩 완료 여부 확인', 
    description: '사용자의 온보딩 완료 여부를 확인합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Completion status checked successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async isOnboardingCompleted(@Req() req): Promise<ResponseDto<{ completed: boolean }>> {
    const userId = req.user.user_id;
    const completed = await this.onboardingService.isOnboardingCompleted(userId);
    return new ResponseDto(200, 'Completion status checked successfully', { completed });
  }

  @Get('result')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '온보딩 결과 조회', 
    description: '완료된 온보딩의 결과와 추천 콘텐츠를 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Result retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  @ApiResponse({ status: 404, description: 'Onboarding information not found' })
  async getOnboardingResult(@Req() req): Promise<ResponseDto<OnboardingResultDto>> {
    const userId = req.user.user_id;
    const result = await this.onboardingService.getOnboardingResult(userId);
    return new ResponseDto(200, 'Result retrieved successfully', result);
  }

  @Get('recommended-contents')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '추천 콘텐츠 조회', 
    description: '사용자의 취향을 기반으로 추천 콘텐츠를 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Recommended contents retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async getRecommendedContents(@Req() req): Promise<ResponseDto<any[]>> {
    const userId = req.user.user_id;
    const result = await this.onboardingService.getRecommendedContents(userId, 10);
    return new ResponseDto(200, 'Recommended contents retrieved successfully', result);
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ 
    summary: '온보딩 정보 조회', 
    description: '사용자의 온보딩 정보를 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: 'Information retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  @ApiResponse({ status: 404, description: 'Onboarding information not found' })
  async getOnboarding(@Req() req) {
    const userId = req.user.user_id;
    const result = await this.onboardingService.getOnboarding(userId);
    return new ResponseDto(200, 'Information retrieved successfully', result);
  }
} 