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
const anime_schema_1 = require("../../../schemas/anime.schema");
let AnimeService = class AnimeService {
    constructor(animeModel) {
        this.animeModel = animeModel;
    }
    async createAnime(animeDto) {
        const createdAnime = new this.animeModel(animeDto);
        try {
            await createdAnime.save();
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Nie udało się utworzyć anime. Prawdopodobnie próba utworzenia anime o istniejącej nazwie/slug.");
        }
        return createdAnime;
    }
    async getAnimeBySlug(slug) {
        return await this.animeModel.findOne({ slug });
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnimeService);
exports.AnimeService = AnimeService;
//# sourceMappingURL=anime.service.js.map