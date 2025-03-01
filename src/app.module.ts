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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule, 
  ],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}