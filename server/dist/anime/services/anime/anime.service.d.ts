import { Model, SortOrder, Types } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { Anime } from "src/schemas/anime.schema";
import { UsersService } from "src/users/services/users/users.service";
export declare class AnimeService {
    private readonly proposalService;
    private animeModel;
    private readonly userService;
    constructor(proposalService: ProposalsService, animeModel: Model<Anime>, userService: UsersService);
    addAnime(animeDto: CreateAnimeDto): Promise<void>;
    validateAnime(animeDto: CreateAnimeDto): Promise<void>;
    createAnime(animeDto: CreateAnimeDto, requestedBy: Types.ObjectId): Promise<string>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    getAnimeData(slug: string): Promise<Anime>;
    getAnime(page: number, limit: number, sortBy: string, sortOrder: SortOrder): Promise<Anime[]>;
    patchAnimeBySlug(slug: string, animeDto: CreateAnimeDto): Promise<Anime>;
}
