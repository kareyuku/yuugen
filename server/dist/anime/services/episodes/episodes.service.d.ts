import { Model, Types } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
export declare class EpisodesService {
    private readonly animeService;
    private readonly groupService;
    private animeModel;
    constructor(animeService: AnimeService, groupService: GroupsService, animeModel: Model<Anime>);
    addEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    validateEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    createEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    deleteEpisode(slug: string, episode: number): Promise<void>;
    createSource(slug: string, episode: number, sourceDto: CreateSourceDto, user: Types.ObjectId): Promise<void>;
}
