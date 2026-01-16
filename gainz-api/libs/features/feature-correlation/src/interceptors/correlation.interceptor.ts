import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

export const CORRELATION_ID_KEY = 'X-Correlation-Id';

@Injectable()
export class CorrelationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    let correlationId = request.headers[CORRELATION_ID_KEY.toLowerCase()];
    if (correlationId === undefined) {
      correlationId = randomUUID();
    }
    request.headers[CORRELATION_ID_KEY] = correlationId;
    response.header(CORRELATION_ID_KEY, correlationId);
    return next.handle();
  }
}
