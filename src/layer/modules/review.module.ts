import { Module } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { ReviewRepository } from '../repositories/review.repository';
import { PrismaService } from '../../../prisma/prisma.service'; 

@Module({
    providers: [ReviewService, ReviewRepository, PrismaService], 
    exports: [ReviewRepository],
  })
  export class ReviewModule {}
