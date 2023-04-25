import { Model, Types } from "mongoose";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
import { UsersService } from "src/users/services/users/users.service";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
export declare class EpisodesService {
    private readonly animeService;
    private readonly groupService;
    private readonly proposalService;
    private readonly userService;
    private animeModel;
    constructor(animeService: AnimeService, groupService: GroupsService, proposalService: ProposalsService, userService: UsersService, animeModel: Model<Anime>);
    addEpisode(episodeDto: CreateEpisodeDto, slug: string): Promise<void>;
    validateEpisode(episodeDto: CreateEpisodeDto, anime: Anime): Promise<void>;
    createEpisode(episodeDto: CreateEpisodeDto, slug: string, requestedBy: Types.ObjectId): Promise<string>;
    deleteEpisode(slug: string, episode: number): Promise<void>;
    addSource(sourceDto: CreateSourceDto, slug: string, episode: number, user: Types.ObjectId): Promise<void>;
    validateSource(sourceDto: CreateSourceDto, episode: number, anime: Anime, user: Types.ObjectId, isFromProposal?: boolean): Promise<number>;
    createSource(slug: string, episode: number, sourceDto: CreateSourceDto, requestedBy: Types.ObjectId): Promise<string>;
}
