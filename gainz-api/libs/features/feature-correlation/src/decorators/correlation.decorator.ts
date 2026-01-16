import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CORRELATION_ID_KEY } from '../interceptors/correlation.interceptor';

export const CorrelationId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.headers[CORRELATION_ID_KEY] as string;
  },
);
