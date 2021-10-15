import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const config = require('../config.json')

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.SERVER_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
