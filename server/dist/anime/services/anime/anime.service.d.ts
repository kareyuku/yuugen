import { Model, SortOrder, Types } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { ProposalsService } from "src/proposals/services/proposals/proposals.service";
import { Anime } from "src/schemas/anime.schema";
import { UsersService } from "src/users/services/users/users.service";
export declare class AnimeService {
    private animeModel;
    private readonly userService;
    private readonly proposalService;
    constructor(animeModel: Model<Anime>, userService: UsersService, proposalService: ProposalsService);
    addAnime(animeDto: CreateAnimeDto): Promise<void>;
    createAnime(animeDto: CreateAnimeDto, requestedBy: Types.ObjectId): Promise<string>;
    validateAnime(animeDto: CreateAnimeDto): Promise<void>;
    getAnimeBySlug(slug: string): Promise<Anime>;
    getAnimeData(slug: string): Promise<Anime>;
    getAnime(page: number, limit: number, sortBy: string, sortOrder: SortOrder): Promise<Anime[]>;
    patchAnimeBySlug(slug: string, animeDto: CreateAnimeDto): Promise<Anime>;
}
