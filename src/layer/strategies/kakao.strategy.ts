import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      callbackURL: configService.getOrThrow<string>('KAKAO_REDIRECT_URI'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, _json } = profile;
    const kakaoAccount = _json.kakao_account;

    return {
        kakaoId: profile.id.toString(),
        email: profile._json.kakao_account.email,
        nickname: profile._json.kakao_account.profile.nickname,
    };
  }
}