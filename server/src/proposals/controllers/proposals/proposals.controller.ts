import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Types } from "mongoose";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { Proposal } from "src/schemas/proposal.schema";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";
import { OKResponse } from "src/utils/responses";

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

  @Delete(":proposalId")
  @UseGuards(AdminGuard)
  async deleteProposal(
    @Param("proposalId") proposalId: string | Types.ObjectId
  ) {
    try {
      proposalId = new Types.ObjectId(proposalId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }
    await this.proposalService.deleteProposal(proposalId);
    return OKResponse("Pomyślnie odrzucono wniosek.");
  }
}
