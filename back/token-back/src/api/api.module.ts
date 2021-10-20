import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ApiPublicController } from './api-public.controller';
import { EmailWorkerService } from 'src/email-worker/email-worker.service';
import { AccessControlService } from 'src/access-control/access-control.service';

@Module({
  providers: [ApiService, EmailWorkerService, AccessControlService],
  controllers: [ApiController, ApiPublicController]
})
export class ApiModule {}
