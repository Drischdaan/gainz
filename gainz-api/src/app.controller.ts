import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

export class PingResponse {
  @ApiProperty()
  ping: string;
}

@Controller()
export class AppController {
  @Get('ping')
  @ApiOkResponse({ type: PingResponse })
  getPing(): PingResponse {
    return { ping: 'pong' };
  }
}
