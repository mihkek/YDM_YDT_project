import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User';
import { TokenControlMiddleware } from './middlewares/token-control-mdlw';
import { AccessControlController } from './access-control/access-control.controller';
import { AccessControlService } from './access-control/access-control.service';
import { AccessControlModule } from './access-control/access-control.module';
import { ApiModule } from './api/api.module';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { EmailWorkerService } from './email-worker/email-worker.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import {SignUpConfirmWait} from './models/SignUpConfirmWait'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'postgres',
      logging: true,
      synchronize: true,
      entities: [User,SignUpConfirmWait],
    }),
    AccessControlModule,
    ApiModule
  ],
  controllers: [AppController, AccessControlController, ApiController],
  providers: [AppService, AccessControlService, ApiService, EmailWorkerService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenControlMiddleware)
      .forRoutes("/api");
  }
  
}
