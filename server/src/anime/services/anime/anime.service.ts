import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { Anime } from "src/schemas/anime.schema";

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime.name) private animeModel: Model<Anime>) {}

  async createAnime(animeDto: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(animeDto);
    try {
      await createdAnime.save();
      return createdAnime;
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

  async patchAnimeBySlug(
    slug: string,
    animeDto: CreateAnimeDto
  ): Promise<Anime> {
    return await this.animeModel.findOneAndUpdate({ slug }, animeDto, {
      returnOriginal: false,
    });
  }

}
