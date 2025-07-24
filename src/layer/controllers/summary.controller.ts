import { SummaryService } from '../services/summary.service';
import { CreateSummaryDto, UpdateSummaryDto} from '../dtos/summary.dto';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Summary') // ✅ Swagger에서 `summary` 그룹으로 표시
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  @ApiOperation({ summary: '새로운 요약 생성' }) // ✅ Swagger에서 API 설명 추가
  @ApiResponse({ status: 201, description: '요약이 성공적으로 생성됨.' })
  async create(@Body() dto: CreateSummaryDto) {
    return this.summaryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '모든 요약 조회' })
  @ApiResponse({ status: 200, description: '요약 목록 반환' })
  async findAll() {
    return this.summaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 요약 조회' })
  @ApiResponse({ status: 200, description: '요약 정보 반환' })
  @ApiResponse({ status: 404, description: '요약을 찾을 수 없음' })
  async findOne(@Param('id') id: number) {
    return this.summaryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '특정 요약 수정' })
  @ApiResponse({ status: 200, description: '요약이 성공적으로 수정됨' })
  @ApiResponse({ status: 404, description: '요약을 찾을 수 없음' })
  async update(@Param('id') id: number, @Body() dto: UpdateSummaryDto) {
    return this.summaryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '특정 요약 삭제' })
  @ApiResponse({ status: 200, description: '요약이 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '요약을 찾을 수 없음' })
  async delete(@Param('id') id: number) {
    return this.summaryService.delete(id);
  }
}
