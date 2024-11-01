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
exports.AnimeController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const CreateAnime_dto_1 = require("../../dtos/CreateAnime.dto");
const anime_service_1 = require("../../services/anime/anime.service");
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const anime_schema_1 = require("../../../schemas/anime.schema");
const mongooseClassSerializer_interceptor_1 = require("../../../utils/mongooseClassSerializer.interceptor");
const responses_1 = require("../../../utils/responses");
let AnimeController = class AnimeController {
    constructor(animeService) {
        this.animeService = animeService;
    }
    async createAnime(createAnimeDto, req) {
        return (0, responses_1.OKResponse)(await this.animeService.createAnime(createAnimeDto, new mongoose_1.Types.ObjectId(req.user.toString())));
    }
    async getAnimeBySlug(slug) {
        return await this.animeService.getAnimeData(slug);
    }
    async getAnime(page, limit, sortBy, sortOrder) {
        return this.animeService.getAnime(parseInt(page), parseInt(limit), sortBy, sortOrder);
    }
    async patchAnimeBySlug(slug, createAnimeDto) {
        return await this.animeService.patchAnimeBySlug(slug, createAnimeDto);
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAnime_dto_1.CreateAnimeDto, Object]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "createAnime", null);
__decorate([
    (0, common_1.Get)(":slug"),
    (0, common_1.UseInterceptors)((0, mongooseClassSerializer_interceptor_1.default)(anime_schema_1.Anime)),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "getAnimeBySlug", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)((0, mongooseClassSerializer_interceptor_1.default)(anime_schema_1.Anime)),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("sort_by")),
    __param(3, (0, common_1.Query)("sort_order")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "getAnime", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.Patch)(":slug"),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateAnime_dto_1.CreateAnimeDto]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "patchAnimeBySlug", null);
AnimeController = __decorate([
    (0, common_1.Controller)("anime"),
    __param(0, (0, common_1.Inject)("ANIME_SERVICE")),
    __metadata("design:paramtypes", [anime_service_1.AnimeService])
], AnimeController);
exports.AnimeController = AnimeController;
//# sourceMappingURL=anime.controller.js.map