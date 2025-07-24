import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDto } from '../layer/dtos/response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 이미 ResponseDto인 경우 그대로 반환
        if (data instanceof ResponseDto) {
          return data;
        }

        // Service에서 ResponseDto로 반환하지 않은 경우
        const statusCode = context.switchToHttp().getResponse().statusCode;
        return new ResponseDto(statusCode, this.getDefaultMessage(statusCode), data);
      }),
    );
  }

  // 상태 코드에 따른 기본 메시지
  private getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case 201:
        return '생성 성공';
      case 200:
        return '요청 성공';
      case 204:
        return '콘텐츠 없음';
      case 400:
        return '잘못된 요청';
      case 401:
        return '인증 필요';
      case 403:
        return '접근 거부됨';
      case 404:
        return '리소스를 찾을 수 없음';
      case 500:
        return '서버 내부 오류';
      default:
        return '요청 성공';
    }
  }
}
