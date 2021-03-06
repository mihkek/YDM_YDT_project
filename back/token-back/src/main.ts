import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DailyEarn_byBalance} from './tasks/daily-earn'
import { DailyEarn_forReferals } from './tasks/daily-earn';

const config = require('../config.json')
require('dotenv').config()

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || config.SERVER_PORT);

  //Start tasks for earn tokens
  DailyEarn_byBalance()
  DailyEarn_forReferals()

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
