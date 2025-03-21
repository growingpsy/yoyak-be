import { Injectable, NotFoundException } from '@nestjs/common';
import { SummaryRepository } from '../repositories/summary.repository';
import { CreateSummaryDto,UpdateSummaryDto,SummaryResponseDto } from '../dtos/summary.dto';

@Injectable()
export class SummaryService {
  constructor(private readonly summaryRepository: SummaryRepository) {}

  async create(dto: CreateSummaryDto) {
    return this.summaryRepository.create(dto);
  }

  async findAll() {
    return this.summaryRepository.findAll();
  }

  async findOne(id: number) {
    const summary = await this.summaryRepository.findOne(id);
    if (!summary) throw new NotFoundException(`Summary with ID ${id} not found`);
    return summary;
  }

  async update(id: number, dto: UpdateSummaryDto) {
    await this.findOne(id); // 존재하는지 확인
    return this.summaryRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findOne(id); // 존재하는지 확인
    return this.summaryRepository.delete(id);
  }
}
