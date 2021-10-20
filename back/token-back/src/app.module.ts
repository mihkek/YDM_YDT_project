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
import { ChangePasswordWait } from './models/ChangePasswordWait';
import { Balances } from './models/Balances';
import { PayTransactions } from './models/PayTransactions';
import { ReferalLink } from './models/ReferalLink';
import { RefedUser } from './models/refedUser';
import { ApiPublicController } from './api/api-public.controller';

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
      entities: [User,
                 Balances, 
                 SignUpConfirmWait, 
                 ChangePasswordWait, 
                 PayTransactions, 
                 ReferalLink,
                 RefedUser],
    }),
    AccessControlModule,
    ApiModule
  ],
  controllers: [AppController, AccessControlController, ApiController, ApiPublicController],
  providers: [AppService, AccessControlService, ApiService, EmailWorkerService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenControlMiddleware)
      .forRoutes("/api/private",);
  }
  
}
