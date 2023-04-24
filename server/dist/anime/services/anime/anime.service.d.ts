import { Model, SortOrder } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { Anime } from "src/schemas/anime.schema";
export declare class AnimeService {
    private animeModel;
    constructor(animeModel: Model<Anime>);
    addAnime(animeDto: CreateAnimeDto): Promise<void>;
    createAnime(animeDto: CreateAnimeDto): Promise<void>;
    validateAnime(animeDto: CreateAnimeDto): Promise<void>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    getAnimeData(slug: string): Promise<Anime>;
    getAnime(page: number, limit: number, sortBy: string, sortOrder: SortOrder): Promise<Anime[]>;
    patchAnimeBySlug(slug: string, animeDto: CreateAnimeDto): Promise<Anime>;
}
