import { Module } from '@nestjs/common';
import { ProposalsService } from './services/proposals/proposals.service';
import { ProposalsController } from './controllers/proposals/proposals.controller';

@Module({
  providers: [ProposalsService],
  controllers: [ProposalsController]
})
export class ProposalsModule {}
