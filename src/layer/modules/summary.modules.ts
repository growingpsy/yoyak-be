import { Module } from '@nestjs/common';
import { SummaryService } from '../services/summary.service';
import { SummaryController } from '../controllers/summary.controller';
import { SummaryRepository } from '../repositories/summary.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService, SummaryRepository, PrismaService],
})
export class SummaryModule {}
