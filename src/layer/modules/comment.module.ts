import { Module } from '@nestjs/common';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { CommentRepository } from '../repositories/comment.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}