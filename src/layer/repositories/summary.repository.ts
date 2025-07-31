import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSummaryDto,UpdateSummaryDto,SummaryResponseDto } from '../dtos/summary.dto';


import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@Injectable()
export class SummaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSummaryDto & { user_id: number }) {
    return this.prisma.summary.create({ data });
  }

  async findAll() {
    return this.prisma.summary.findMany();
  }

  async findOne(id: number) {
    return this.prisma.summary.findUnique({ where: { summary_id: id } });
  }

  async update(id: number, data: UpdateSummaryDto) {
    return this.prisma.summary.update({
      where: { summary_id: id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.summary.delete({ where: { summary_id: id } });
  }
}
