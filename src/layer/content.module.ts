import { Module } from '@nestjs/common';
import { ContentController } from './controllers/content.controller';
import { ContentService } from './services/content.service';

@Module({
  controllers: [ContentController], // ContentController 등록
  providers: [ContentService], // ContentService 등록
})
export class ContentModule {}
