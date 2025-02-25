import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // 토큰 만료 시간 (1일)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}