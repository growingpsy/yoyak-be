import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './layer/modules/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ContentController } from 'layer/controllers/content.controller';
import { ContentService } from 'layer/services/content.service';
import { CommentModule } from './layer/modules/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}
