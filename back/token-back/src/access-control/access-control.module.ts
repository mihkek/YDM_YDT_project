import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { EmailWorkerService } from 'src/email-worker/email-worker.service';

@Module({
  providers: [AccessControlService, EmailWorkerService],
  controllers: [AccessControlController]
})
export class AccessControlModule {}
