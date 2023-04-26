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
exports.EpisodesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const anime_schema_1 = require("../../../schemas/anime.schema");
const groups_service_1 = require("../../../users/services/groups/groups.service");
const users_service_1 = require("../../../users/services/users/users.service");
const Ranks_1 = require("../../../auth/utils/Ranks");
const proposals_service_1 = require("../../../proposals/services/proposals/proposals.service");
let EpisodesService = class EpisodesService {
    constructor(groupService, proposalService, userService, animeModel) {
        this.groupService = groupService;
        this.proposalService = proposalService;
        this.userService = userService;
        this.animeModel = animeModel;
    }
    async addEpisode(episodeDto, slug) {
        const anime = await this.animeModel.findOne({ slug });
        await this.validateEpisode(episodeDto, anime);
        try {
            anime.episodes.push(Object.assign(Object.assign({}, episodeDto), { sources: undefined }));
            await anime.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Zapisanie epizodu nie powiodło się.");
        }
    }
    async validateEpisode(episodeDto, anime) {
        if (!anime)
            throw new common_1.BadRequestException("Nie znaleziono anime o podanym slug.");
        if (anime.episodes.find((episode) => episode.number === episodeDto.number))
            throw new common_1.BadRequestException("Epizod o podanym numerze już istnieje.");
    }
    async createEpisode(episodeDto, slug, requestedBy) {
        const requestedUser = await this.userService.findUserById(requestedBy);
        if (requestedUser.rank === Ranks_1.default.Admin) {
            await this.addEpisode(episodeDto, slug);
            return "Pomyślnie dodano epizod.";
        }
        await this.validateEpisode(episodeDto, await this.animeModel.findOne({ slug }));
        await this.proposalService.addProposal(2, requestedBy, { episode_data: episodeDto, anime_slug: slug });
        return "Pomyślnie dodano wniosek o utworzenie epizodu.";
    }
    async deleteEpisode(slug, episode) {
        const anime = await this.animeModel.findOne({ slug });
        if (!anime)
            throw new common_1.BadRequestException("Nie znaleziono anime o podanym slug.");
        anime.episodes = anime.episodes.filter((episo) => episo.number !== episode);
        try {
            await anime.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Usuwanie epizodu nie powiodło się.");
        }
    }
    async addSource(sourceDto, slug, episode, user) {
        const anime = await this.animeModel.findOne({ slug });
        const index = await this.validateSource(sourceDto, episode, anime, user, true);
        anime.episodes[index].sources.push(Object.assign(Object.assign({}, sourceDto), { uploader: user }));
        try {
            await anime.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Zapisanie źródła nie powiodło się.");
        }
    }
    async validateSource(sourceDto, episode, anime, user, isFromProposal = false) {
        if (!anime)
            throw new common_1.BadRequestException("Nie znaleziono anime o podanym slug.");
        if (sourceDto.group) {
            try {
                sourceDto.group = new mongoose_2.Types.ObjectId(sourceDto.group);
            }
            catch (_a) {
                throw new common_1.BadRequestException("Zły format id grupy.");
            }
            const group = await this.groupService.findGroupById(sourceDto.group);
            if (!group)
                throw new common_1.BadRequestException("Nie ma grupy o podanym id.");
            if (!(group.members.includes(user) || group.owner.equals(user)))
                throw new common_1.BadRequestException(isFromProposal
                    ? "Użytkownik nie należy już do grupy."
                    : "Nie należysz do tej grupy.");
        }
        const foundEpisodeIndex = anime.episodes.findIndex((epis) => epis.number === episode);
        if (foundEpisodeIndex === -1)
            throw new common_1.BadRequestException("Nie znaleziono odcinka o podanym numerze.");
        return foundEpisodeIndex;
    }
    async createSource(slug, episode, sourceDto, requestedBy) {
        const requestedUser = await this.userService.findUserById(requestedBy);
        if (requestedUser.rank === Ranks_1.default.Admin) {
            await this.addSource(sourceDto, slug, episode, requestedBy);
            return "Pomyślnie utworzono źródło.";
        }
        await this.validateSource(sourceDto, episode, await this.animeModel.findOne({ slug }), requestedBy);
        await this.proposalService.addProposal(3, requestedBy, { source_data: sourceDto, anime_slug: slug, episode });
        return "Pomyślnie dodano wniosek o utworzenie źródła.";
    }
};
EpisodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("GROUP_SERVICE")),
    __param(1, (0, common_1.Inject)("PROPOSAL_SERVICE")),
    __param(2, (0, common_1.Inject)("USER_SERVICE")),
    __param(3, (0, mongoose_1.InjectModel)(anime_schema_1.Anime.name)),
    __metadata("design:paramtypes", [groups_service_1.GroupsService,
        proposals_service_1.ProposalsService,
        users_service_1.UsersService,
        mongoose_2.Model])
], EpisodesService);
exports.EpisodesService = EpisodesService;
//# sourceMappingURL=episodes.service.js.map