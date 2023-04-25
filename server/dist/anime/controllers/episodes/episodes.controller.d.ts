import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
import { EpisodesService } from "src/anime/services/episodes/episodes.service";
import { Request } from "express";
export declare class EpisodesController {
    private readonly episodesService;
    constructor(episodesService: EpisodesService);
    createEpisode(createEpisodeDto: CreateEpisodeDto, slug: string, req: Request): Promise<Object>;
    deleteEpisode(slug: string, episode: string): Promise<Object>;
    createSource(slug: string, episode: string, createSourceDto: CreateSourceDto, req: Request): Promise<Object>;
}
