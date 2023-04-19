import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    createAnime(createAnimeDto: CreateAnimeDto): Promise<Object>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    patchAnimeBySlug(slug: string, createAnimeDto: CreateAnimeDto): Promise<Anime>;
}
