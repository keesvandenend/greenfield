import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMsg() {
    return { msg: 'The new world address search app, try our disrupting technology!' };
  }
}
