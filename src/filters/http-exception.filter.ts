import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../layer/dtos/response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 내부 오류가 발생했습니다.';

    // 예외 상태 및 메시지 추출
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse['message']
      ) {
        const msg = exceptionResponse['message'];
        // 배열일 경우 문자열로 변환
        message = Array.isArray(msg) ? msg.join(', ') : msg;
      }
    }

    // 예외 상세 로그 출력
    this.logger.error(`[${status}] ${message}`);
    if (exception.stack) {
      this.logger.error(exception.stack);
    }

    const responseDto = new ResponseDto(status, message, null);
    response.status(status).json(responseDto);
  }
}