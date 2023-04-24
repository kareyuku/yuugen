import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
import { Request } from "express";
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    createAnime(createAnimeDto: CreateAnimeDto, req: Request): Promise<Object>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    getAnime(page: string, limit: string, sortBy: string, sortOrder: string): Promise<Anime[]>;
    patchAnimeBySlug(slug: string, createAnimeDto: CreateAnimeDto): Promise<Anime>;
}
