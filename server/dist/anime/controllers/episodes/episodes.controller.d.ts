import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { EpisodesService } from "src/anime/services/episodes/episodes.service";
export declare class EpisodesController {
    private readonly episodesService;
    constructor(episodesService: EpisodesService);
    createEpisode(createEpisodeDto: CreateEpisodeDto, slug: string): Promise<Object>;
    deleteEpisode(slug: string, episode: string): Promise<Object>;
}
