import { Module } from '@nestjs/common';
import { HighlightService } from '../services/highlight.service';
import { HighlightRepository } from '../repositories/highlight.repository';
import { HighlightController } from '../controllers/highlight.controller';
import { SummaryModule } from './summary.module';  
import { ReviewModule } from './review.module';    
import { PrismaService } from '../../../prisma/prisma.service';  

@Module({
    imports: [SummaryModule, ReviewModule],  
    controllers: [HighlightController],
    providers: [
      HighlightService,
      HighlightRepository,  
      PrismaService,        
    ],
    exports: [HighlightService],  
  })
  export class HighlightModule {}
