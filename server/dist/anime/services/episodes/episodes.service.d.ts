import { Model, Types } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
export declare class EpisodesService {
    private readonly animeService;
    private animeModel;
    constructor(animeService: AnimeService, animeModel: Model<Anime>);
    createEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    deleteEpisode(slug: string, episode: number): Promise<void>;
    createSource(slug: string, episode: number, sourceDto: CreateSourceDto, user: Types.ObjectId): Promise<void>;
}
