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
exports.EpisodesController = void 0;
const common_1 = require("@nestjs/common");
const CreateEpisode_dto_1 = require("../../dtos/CreateEpisode.dto");
const CreateSource_dto_1 = require("../../dtos/CreateSource.dto");
const episodes_service_1 = require("../../services/episodes/episodes.service");
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const responses_1 = require("../../../utils/responses");
const mongoose_1 = require("mongoose");
let EpisodesController = class EpisodesController {
    constructor(episodesService) {
        this.episodesService = episodesService;
    }
    async createEpisode(createEpisodeDto, slug) {
        await this.episodesService.createEpisode(createEpisodeDto, slug);
        return (0, responses_1.OKResponse)("Pomyślnie dodano epizod.");
    }
    async deleteEpisode(slug, episode) {
        await this.episodesService.deleteEpisode(slug, parseInt(episode));
        return (0, responses_1.OKResponse)("Pomyślnie usunięto epizod.");
    }
    async createSource(slug, episode, createSourceDto, req) {
        await this.episodesService.createSource(slug, parseInt(episode), createSourceDto, new mongoose_1.Types.ObjectId(req.user.toString()));
        return (0, responses_1.OKResponse)("Pomyślnie dodano źródło.");
    }
};
__decorate([
    (0, common_1.Post)(":slug"),
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateEpisode_dto_1.CreateEpisodeDto, String]),
    __metadata("design:returntype", Promise)
], EpisodesController.prototype, "createEpisode", null);
__decorate([
    (0, common_1.Delete)(":slug/:episode"),
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Param)("episode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EpisodesController.prototype, "deleteEpisode", null);
__decorate([
    (0, common_1.Post)(":slug/:episode"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Param)("episode")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, CreateSource_dto_1.CreateSourceDto, Object]),
    __metadata("design:returntype", Promise)
], EpisodesController.prototype, "createSource", null);
EpisodesController = __decorate([
    (0, common_1.Controller)("episodes"),
    __param(0, (0, common_1.Inject)("EPISODE_SERVICE")),
    __metadata("design:paramtypes", [episodes_service_1.EpisodesService])
], EpisodesController);
exports.EpisodesController = EpisodesController;
//# sourceMappingURL=episodes.controller.js.map