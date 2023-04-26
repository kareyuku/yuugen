import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, SortOrder, Types } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import Ranks from "src/auth/utils/Ranks";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { ProposalType } from "src/proposals/utils/ProposalTypes";
import { Anime } from "src/schemas/anime.schema";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class AnimeService {
  constructor(
    @InjectModel(Anime.name) private animeModel: Model<Anime>,
    @Inject("USER_SERVICE") private readonly userService: UsersService,
    @Inject("PROPOSAL_SERVICE")
    private readonly proposalService: ProposalsService
  ) {}

  async addAnime(animeDto: CreateAnimeDto): Promise<void> {
    await this.validateAnime(animeDto);

    try {
      await new this.animeModel(animeDto).save();
    } catch {
      throw new InternalServerErrorException("Nie udało się utworzyć anime.");
    }
  }

  async createAnime(
    animeDto: CreateAnimeDto,
    requestedBy: Types.ObjectId
  ): Promise<string> {
    const requestedUser = await this.userService.findUserById(requestedBy);

    if (requestedUser.rank === Ranks.Admin) {
      await this.addAnime(animeDto);
      return "Pomyślnie utworzono anime.";
    }

    await this.validateAnime(animeDto);
    await this.proposalService.addProposal(
      ProposalType.ANIME_CREATION,
      requestedBy,
      { anime_data: animeDto }
    );

    return "Pomyślnie dodano wniosek o utworzenie anime.";
  }

  async validateAnime(animeDto: CreateAnimeDto): Promise<void> {
    const anime = await this.animeModel.findOne({
      $or: [{ title: animeDto.title, slug: animeDto.slug }],
    });

    if (!anime) return;

    if (anime.title === animeDto.title)
      throw new ConflictException("Anime o takiej nazwie już istnieje.");

    throw new ConflictException("Anime o takim slug już istnieje.");
  }

  async getAnimeBySlug(slug: string): Promise<Anime> {
    return await this.animeModel.findOne({ slug });
  }

  async getAnimeData(slug: string): Promise<Anime> {
    const anime = await this.animeModel.findOne({ slug });

    if (!anime) throw new BadRequestException("Nie ma anime o podanym slug.");

    return await (
      await anime.populate("episodes.sources.uploader", "username -_id")
    ).populate("episodes.sources.group", "img name");
  }

  async getAnime(
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: SortOrder
  ): Promise<Anime[]> {
    return await this.animeModel
      .find()
      .sort([[sortBy, sortOrder]])
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async patchAnimeBySlug(
    slug: string,
    animeDto: CreateAnimeDto
  ): Promise<Anime> {
    return await this.animeModel.findOneAndUpdate({ slug }, animeDto, {
      returnOriginal: false,
    });
  }
}
