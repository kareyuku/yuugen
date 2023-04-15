import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { Anime } from "src/schemas/anime.schema";

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime.name) private animeModel: Model<Anime>) {}

  // to do error catching
  async createAnime(animeDto: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(animeDto);
    await createdAnime.save();
    return createdAnime;
  }

  async getAnimeBySlug(slug: string): Promise<Anime> {
    return this.animeModel.findOne({ slug });
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
