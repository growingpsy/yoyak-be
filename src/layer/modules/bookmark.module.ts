import { Module } from '@nestjs/common';
import { BookmarkController } from '../controllers/bookmark.controller';
import { BookmarkService } from '../services/bookmark.service';
import { BookmarkRepository } from '../repositories/bookmark.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository, PrismaService],
})
export class BookmarkModule {}
