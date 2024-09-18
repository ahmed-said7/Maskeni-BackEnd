import { Injectable } from '@nestjs/common';

@Injectable()
export class TwilioService {
  resetCode() {
    return String(Math.floor(1000 + Math.random() * 8000));
  }
}
