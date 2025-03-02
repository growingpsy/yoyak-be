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
          if (data instanceof ResponseDto) {
            return data;
          }
          return new ResponseDto(200, '요청 성공', data);
        }),
      );
    }
  }
  