import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AnimeService } from "src/anime/services/anime/anime.service";
import { ProposalType } from "src/proposals/utils/ProposalTypes";
import { Proposal } from "src/schemas/proposal.schema";

@Injectable()
export class ProposalsService {
  constructor(
    @Inject(forwardRef(() => "ANIME_SERVICE"))
    private readonly animeService: AnimeService,
    @InjectModel(Proposal.name) private proposalModel: Model<Proposal>
  ) {}

  async addProposal(
    proposalType: ProposalType,
    addedBy: Types.ObjectId,
    data: {}
  ): Promise<void> {
    const proposal = new this.proposalModel({ proposalType, addedBy, data });

    try {
      await proposal.save();
    } catch {
      throw new InternalServerErrorException("Nie udało się utworzyć wniosku.");
    }
  }

  async getProposals(): Promise<Proposal[]> {
    return await this.proposalModel
      .find()
      .populate("addedBy", "username avatar -_id");
  }

  async approveProposal(proposalId: Types.ObjectId): Promise<void> {
    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal)
      throw new BadRequestException("Nie odnaleziono wniosku o podanym Id.");

    switch (proposal.proposalType) {
      case ProposalType.ANIME_CREATION:
        await this.animeService.addAnime(proposal.data.anime_data);
        break;
    }
  }

  async deleteProposal(proposalId: Types.ObjectId): Promise<void> {
    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal)
      throw new BadRequestException("Nie odnaleziono wniosku o podanym Id.");

    try {
      await proposal.deleteOne();
    } catch {
      throw new InternalServerErrorException("Nie udało się odrzucić wniosku.");
    }
  }
}
