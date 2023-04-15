import { Model } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { Anime } from "src/schemas/anime.schema";
export declare class AnimeService {
    private animeModel;
    constructor(animeModel: Model<Anime>);
    createAnime(animeDto: CreateAnimeDto): Promise<Anime>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    patchAnimeBySlug(slug: string, animeDto: CreateAnimeDto): Promise<Anime>;
}
