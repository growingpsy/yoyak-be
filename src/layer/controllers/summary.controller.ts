import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SummaryService } from '../services/summary.service';
import {
  CreateSummaryDto,
  UpdateSummaryDto,
  SummaryResponseDto,
} from '../dtos/summary.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../strategies/current-user.decorator';

@ApiTags('Summary')
@ApiBearerAuth('access-token') // ✅ Swagger 인증 표시
@UseGuards(AuthGuard('jwt'))   // ✅ JWT 인증 적용
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  @ApiOperation({ summary: '요약 생성' })
  @ApiResponse({ status: 201, description: '요약 생성 완료', type: SummaryResponseDto })
  async create(
    @Body() dto: CreateSummaryDto,
    @CurrentUser() user: {  user_id: number },
  ): Promise<SummaryResponseDto> {
      console.log('✅ CurrentUser:', user); 
    return this.summaryService.create(dto, user. user_id);
  }

  @Get()
  @ApiOperation({ summary: '전체 요약 목록 조회' })
  @ApiResponse({ status: 200, description: '요약 목록 반환', type: SummaryResponseDto, isArray: true })
  async findAll(): Promise<SummaryResponseDto[]> {
    return this.summaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 요약 조회' })
  @ApiResponse({ status: 200, description: '요약 반환', type: SummaryResponseDto })
  @ApiResponse({ status: 404, description: '요약을 찾을 수 없음' })
  async findOne(@Param('id') id: number): Promise<SummaryResponseDto> {
    return this.summaryService.findOne(+id);
  }

  @Patch(':id')
async update(
  @Param('id') id: number,
  @Body() dto: UpdateSummaryDto,
  @CurrentUser() user: { user_id: number }, // ✅ 인증된 사용자 정보
): Promise<SummaryResponseDto> {
  return this.summaryService.update(id, dto, user.user_id);
}
  @Delete(':id')
  @ApiOperation({ summary: '요약 삭제' })
  @ApiResponse({ status: 200, description: '요약 삭제 완료' })
  @ApiResponse({ status: 404, description: '요약을 찾을 수 없음' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.summaryService.delete(id);
  }
}
