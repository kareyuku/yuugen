import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProposalType } from "src/proposals/utils/ProposalTypes";
import { Proposal } from "src/schemas/proposal.schema";

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<Proposal>
  ) {}

  async addProposal(
    proposalType: ProposalType,
    addedBy: Types.ObjectId,
    data: {}
  ) {
    console.log(data);
  }
}
