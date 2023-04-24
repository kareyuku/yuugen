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

@Injectable()
export class EpisodesService {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService,
    @Inject("GROUP_SERVICE") private readonly groupService: GroupsService,
    @InjectModel(Anime.name) private animeModel: Model<Anime>
  ) {}

  async addEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void> {
    await this.validateEpisode(episodeDto, slug);

    const anime = await this.animeModel.findOne({ slug });

    try {
      // to do optimalization
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
    slug: string
  ): Promise<void> {
    const anime = await this.animeModel.findOne({ slug });

    if (!anime)
      throw new BadRequestException("Nie znaleziono anime o podanym slug.");

    if (anime.episodes.find((episode) => episode.number === episodeDto.number))
      throw new BadRequestException("Epizod o podanym numerze już istnieje.");
  }

  async createEpisode(
    episodeDto: CreateEpisodeDto,
    slug: string
  ): Promise<void> {
    this.addEpisode(episodeDto, slug);
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

  async createSource(
    slug: string,
    episode: number,
    sourceDto: CreateSourceDto,
    user: Types.ObjectId
  ) {
    const anime = await this.animeModel.findOne({ slug });

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
        throw new BadRequestException("Nie należysz to tej grupy.");
    }

    const foundEpisodeIndex = anime.episodes.findIndex(
      (epis) => epis.number === episode
    );

    if (foundEpisodeIndex === -1)
      throw new BadRequestException(
        "Nie znaleziono odcinka o podanym numerze."
      );

    anime.episodes[foundEpisodeIndex].sources.push({
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
}
