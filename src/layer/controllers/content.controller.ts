import { Controller, Get } from '@nestjs/common';
import { ContentService } from '../services/content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  
  @Get('now-playing')
  async getNowPlayingMovies() {
    console.log('GET /content/now-playing 요청 받음'); // 디버깅 로그 추가
    return this.contentService.getNowPlayingMovies();
  }
}