import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
import { UsersService } from "src/users/services/users/users.service";
import Ranks from "src/auth/utils/Ranks";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { ProposalType } from "src/proposals/utils/ProposalTypes";

@Injectable()
export class EpisodesService {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService,
    @Inject("GROUP_SERVICE") private readonly groupService: GroupsService,
    @Inject("PROPOSAL_SERVICE")
    private readonly proposalService: ProposalsService,
    @Inject("USER_SERVICE") private readonly userService: UsersService,
    @InjectModel(Anime.name) private animeModel: Model<Anime>
  ) {}

  async addEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void> {
    const anime = await this.animeModel.findOne({ slug });
    await this.validateEpisode(episodeDto, anime);

    try {
      anime.episodes.push({ ...episodeDto, sources: undefined });
      await anime.save();
    } catch {
      throw new InternalServerErrorException(
        "Zapisanie epizodu nie powiodło się."
      );
    }
  }

  async validateEpisode(
    episodeDto: CreateEpisodeDto,
    anime: Anime
  ): Promise<void> {
    if (!anime)
      throw new BadRequestException("Nie znaleziono anime o podanym slug.");

    if (anime.episodes.find((episode) => episode.number === episodeDto.number))
      throw new BadRequestException("Epizod o podanym numerze już istnieje.");
  }

  async createEpisode(
    episodeDto: CreateEpisodeDto,
    slug: string,
    requestedBy: Types.ObjectId
  ): Promise<string> {
    const requestedUser = await this.userService.findUserById(requestedBy);

    if (requestedUser.rank === Ranks.Admin) {
      await this.addEpisode(episodeDto, slug);
      return "Pomyślnie dodano epizod.";
    }

    await this.validateEpisode(
      episodeDto,
      await this.animeModel.findOne({ slug })
    );
    await this.proposalService.addProposal(
      ProposalType.EPISODE_CREATION,
      requestedBy,
      { episodeDto, slug }
    );

    return "Pomyślnie dodano wniosek o utworzenie epizodu.";
  }

  // to do znalezienie epizodu o podanym numerze hi hi
  async deleteEpisode(slug: string, episode: number): Promise<void> {
    const anime = await this.animeModel.findOne({ slug });

    if (!anime)
      throw new BadRequestException("Nie znaleziono anime o podanym slug.");

    anime.episodes = anime.episodes.filter((episo) => episo.number !== episode);

    try {
      await anime.save();
    } catch {
      throw new InternalServerErrorException(
        "Usuwanie epizodu nie powiodło się."
      );
    }
  }

  async addSource(
    sourceDto: CreateSourceDto,
    slug: string,
    episode: number,
    user: Types.ObjectId
  ): Promise<void> {
    const anime = await this.animeModel.findOne({ slug });

    const index = await this.validateSource(
      sourceDto,
      episode,
      anime,
      user,
      true
    );

    anime.episodes[index].sources.push({
      ...sourceDto,
      uploader: user,
    });

    try {
      await anime.save();
    } catch {
      throw new InternalServerErrorException(
        "Zapisanie źródła nie powiodło się."
      );
    }
  }

  async validateSource(
    sourceDto: CreateSourceDto,
    episode: number,
    anime: Anime,
    user: Types.ObjectId,
    isFromProposal: boolean = false
  ): Promise<number> {
    if (!anime)
      throw new BadRequestException("Nie znaleziono anime o podanym slug.");

    if (sourceDto.group) {
      try {
        sourceDto.group = new Types.ObjectId(sourceDto.group);
      } catch {
        throw new BadRequestException("Zły format id grupy.");
      }
      const group = await this.groupService.findGroupById(sourceDto.group);

      if (!group) throw new BadRequestException("Nie ma grupy o podanym id.");

      if (!(group.members.includes(user) || group.owner.equals(user)))
        throw new BadRequestException(
          isFromProposal
            ? "Użytkownik nie należy już do grupy."
            : "Nie należysz do tej grupy."
        );
    }

    const foundEpisodeIndex = anime.episodes.findIndex(
      (epis) => epis.number === episode
    );

    if (foundEpisodeIndex === -1)
      throw new BadRequestException(
        "Nie znaleziono odcinka o podanym numerze."
      );

    return foundEpisodeIndex;
  }

  async createSource(
    slug: string,
    episode: number,
    sourceDto: CreateSourceDto,
    requestedBy: Types.ObjectId
  ): Promise<string> {
    const requestedUser = await this.userService.findUserById(requestedBy);

    if (requestedUser.rank === Ranks.Admin) {
      await this.addSource(sourceDto, slug, episode, requestedBy);
      return "Pomyślnie utworzono źródło.";
    }

    await this.validateSource(
      sourceDto,
      episode,
      await this.animeModel.findOne({ slug }),
      requestedBy
    );
    await this.proposalService.addProposal(
      ProposalType.SOURCE_CREATION,
      requestedBy,
      { sourceDto, slug, episode }
    );

    return "Pomyślnie dodano wniosek o utworzenie źródła.";
  }
}
