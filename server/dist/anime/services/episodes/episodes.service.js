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
const anime_service_1 = require("../anime/anime.service");
const anime_schema_1 = require("../../../schemas/anime.schema");
const groups_service_1 = require("../../../users/services/groups/groups.service");
let EpisodesService = class EpisodesService {
    constructor(animeService, groupService, animeModel) {
        this.animeService = animeService;
        this.groupService = groupService;
        this.animeModel = animeModel;
    }
    async createEpisode(episodeDto, slug) {
        const anime = await this.animeModel.findOne({ slug });
        if (!anime)
            throw new common_1.BadRequestException("Nie znaleziono anime o podanym slug.");
        if (anime.episodes.find((episode) => episode.number === episodeDto.number))
            throw new common_1.BadRequestException("Epizod o podanym numerze już istnieje.");
        anime.episodes.push(Object.assign(Object.assign({}, episodeDto), { sources: undefined }));
        try {
            await anime.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Zapisanie epizodu nie powiodło się.");
        }
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
    async createSource(slug, episode, sourceDto, user) {
        const anime = await this.animeModel.findOne({ slug });
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
            if (!(group.members.includes(user) || group.owner === user))
                throw new common_1.BadRequestException("Nie należysz to tej grupy.");
        }
        const foundEpisodeIndex = anime.episodes.findIndex((epis) => epis.number === episode);
        if (foundEpisodeIndex === -1)
            throw new common_1.BadRequestException("Nie znaleziono odcinka o podanym numerze.");
        anime.episodes[foundEpisodeIndex].sources.push(Object.assign(Object.assign({}, sourceDto), { uploader: user }));
        try {
            await anime.save();
        }
        catch (_b) {
            throw new common_1.InternalServerErrorException("Zapisanie źródła nie powiodło się.");
        }
    }
};
EpisodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("ANIME_SERVICE")),
    __param(1, (0, common_1.Inject)("GROUP_SERVICE")),
    __param(2, (0, mongoose_1.InjectModel)(anime_schema_1.Anime.name)),
    __metadata("design:paramtypes", [anime_service_1.AnimeService,
        groups_service_1.GroupsService,
        mongoose_2.Model])
], EpisodesService);
exports.EpisodesService = EpisodesService;
//# sourceMappingURL=episodes.service.js.map