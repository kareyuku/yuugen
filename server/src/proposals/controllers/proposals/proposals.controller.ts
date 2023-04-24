import { Controller, Inject } from "@nestjs/common";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";

@Controller("proposals")
export class ProposalsController {
  constructor(
    @Inject("PROPOSAL_SERVICE")
    private readonly proposalService: ProposalsService
  ) {}
}
