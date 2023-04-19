import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";

@Injectable()
export class EpisodesService {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService,
    @InjectModel(Anime.name) private animeModel: Model<Anime>
  ) {}

  async createEpisode(
    episodeDto: CreateEpisodeDto,
    slug: string
  ): Promise<void> {
    const anime = await this.animeModel.findOne({ slug });

    if (!anime)
      throw new BadRequestException("Nie znaleziono anime o podanym slug.");

    if (anime.episodes.find((episode) => episode.number === episodeDto.number))
      throw new BadRequestException("Epizod o podanym numerze już istnieje.");

    anime.episodes.push({ ...episodeDto });
    try {
      await anime.save();
    } catch {
      throw new InternalServerErrorException(
        "Zapisanie anime nie powiodło się."
      );
    }
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
}
