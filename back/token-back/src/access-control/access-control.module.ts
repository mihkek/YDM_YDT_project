import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';

@Module({
  providers: [AccessControlService],
  controllers: [AccessControlController]
})
export class AccessControlModule {}
