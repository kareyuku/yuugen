import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    createAnime(createAnimeDto: CreateAnimeDto): Promise<import("../../../schemas/anime.schema").Anime>;
    getAnimeBySlug(slug: string): Promise<import("../../../schemas/anime.schema").Anime>;
    patchAnimeBySlug(slug: string, createAnimeDto: CreateAnimeDto): Promise<import("../../../schemas/anime.schema").Anime>;
}
