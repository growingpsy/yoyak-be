import { Injectable, NotFoundException } from '@nestjs/common';
import { SummaryRepository } from '../repositories/summary.repository';
import {
  CreateSummaryDto,
  UpdateSummaryDto,
  SummaryResponseDto,
} from '../dtos/summary.dto';
import { SummaryConverter } from '../converter/summary.converter';
  import { ForbiddenException } from '@nestjs/common';
@Injectable()
export class SummaryService {
  constructor(private readonly summaryRepository: SummaryRepository) {}

  async create(dto: CreateSummaryDto, userId: number): Promise<SummaryResponseDto> {
    const created = await this.summaryRepository.create({
      ...dto,
      user_id: userId,
    } as CreateSummaryDto & { user_id: number });

    return SummaryConverter.toDto(created);
  }

  async findAll(): Promise<SummaryResponseDto[]> {
    const summaries = await this.summaryRepository.findAll();
    return SummaryConverter.toDtoList(summaries);
  }

  async findOne(id: number): Promise<SummaryResponseDto> {
    const summary = await this.summaryRepository.findOne(id);
    if (!summary) throw new NotFoundException(`요약 ID ${id} 없음`);
    return SummaryConverter.toDto(summary);
  }



    async update(
      id: number,
      dto: UpdateSummaryDto,
      userId: number,
    ): Promise<SummaryResponseDto> {
      const summary = await this.findOne(id);

     
      if (summary.user_id !== userId) {
        throw new ForbiddenException('요약을 수정할 권한이 없습니다.');
      }

      const updated = await this.summaryRepository.update(id, dto);
      return SummaryConverter.toDto(updated);
    }


  async delete(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.summaryRepository.delete(id);
    return { message: `요약 ID ${id}가 삭제되었습니다.` };
  }
}
