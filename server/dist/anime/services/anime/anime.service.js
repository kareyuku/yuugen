"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Ranks_1 = require("../../../auth/utils/Ranks");
const proposals_service_1 = require("../../../proposals/services/proposals/proposals.service");
const anime_schema_1 = require("../../../schemas/anime.schema");
const users_service_1 = require("../../../users/services/users/users.service");
let AnimeService = class AnimeService {
    constructor(animeModel, userService, proposalService) {
        this.animeModel = animeModel;
        this.userService = userService;
        this.proposalService = proposalService;
    }
    async addAnime(animeDto) {
        await this.validateAnime(animeDto);
        try {
            await new this.animeModel(animeDto).save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Nie udało się utworzyć anime.");
        }
    }
    async createAnime(animeDto, requestedBy) {
        const requestedUser = await this.userService.findUserById(requestedBy);
        if (requestedUser.rank === Ranks_1.default.Admin) {
            await this.addAnime(animeDto);
            return "Pomyślnie utworzono anime.";
        }
        await this.validateAnime(animeDto);
        await this.proposalService.addProposal(1, requestedBy, animeDto);
        return "Pomyślnie dodano wniosek o utworzenie anime.";
    }
    async validateAnime(animeDto) {
        const anime = await this.animeModel.findOne({
            $or: [{ title: animeDto.title, slug: animeDto.slug }],
        });
        if (!anime)
            return;
        if (anime.title === animeDto.title)
            throw new common_1.ConflictException("Anime o takiej nazwie już istnieje.");
        throw new common_1.ConflictException("Anime o takim slug już istnieje.");
    }
    async getAnimeBySlug(slug) {
        return await this.animeModel.findOne({ slug });
    }
    async getAnimeData(slug) {
        const anime = await this.animeModel.findOne({ slug });
        if (!anime)
            throw new common_1.BadRequestException("Nie ma anime o podanym slug.");
        return await (await anime.populate("episodes.sources.uploader", "username -_id")).populate("episodes.sources.group", "img name");
    }
    async getAnime(page, limit, sortBy, sortOrder) {
        return await this.animeModel
            .find()
            .sort([[sortBy, sortOrder]])
            .skip(limit * (page - 1))
            .limit(limit);
    }
    async patchAnimeBySlug(slug, animeDto) {
        return await this.animeModel.findOneAndUpdate({ slug }, animeDto, {
            returnOriginal: false,
        });
    }
};
AnimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(anime_schema_1.Anime.name)),
    __param(1, (0, common_1.Inject)("USER_SERVICE")),
    __param(2, (0, common_1.Inject)("PROPOSAL_SERVICE")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        proposals_service_1.ProposalsService])
], AnimeService);
exports.AnimeService = AnimeService;
//# sourceMappingURL=anime.service.js.map