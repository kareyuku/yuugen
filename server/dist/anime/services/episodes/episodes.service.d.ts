import { Model } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
export declare class EpisodesService {
    private readonly animeService;
    private animeModel;
    constructor(animeService: AnimeService, animeModel: Model<Anime>);
    createEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    deleteEpisode(slug: string, episode: number): Promise<void>;
}
