import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ContentController } from 'layer/controllers/content.controller';
import { ContentService } from 'layer/services/content.service';

@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,  // 환경 변수들을 애플리케이션 전역에서 사용 가능하게 설정
    }),
  ],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}