import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, SortOrder } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { Anime } from "src/schemas/anime.schema";

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime.name) private animeModel: Model<Anime>) {}

  async createAnime(animeDto: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(animeDto);
    try {
      return await createdAnime.save();
    } catch (err) {
      if (err.keyValue.title)
        throw new ConflictException("Anime o takiej nazwie już istnieje.");
      if (err.keyValue.slug)
        throw new ConflictException("Anime o takim slug już istnieje.");
    }
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
