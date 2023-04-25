import {
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { Proposal } from "src/schemas/proposal.schema";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";

@Controller("proposals")
export class ProposalsController {
  constructor(
    @Inject("PROPOSAL_SERVICE")
    private readonly proposalService: ProposalsService
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(MongooseClassSerializerInterceptor(Proposal))
  async getProposals() {
    return this.proposalService.getProposals();
  }
}
