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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("../../../schemas/review.schema");
const anime_service_1 = require("../anime/anime.service");
const anime_schema_1 = require("../../../schemas/anime.schema");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, animeModel, animeService) {
        this.reviewModel = reviewModel;
        this.animeModel = animeModel;
        this.animeService = animeService;
    }
    async getReviewById(reviewId) {
        return await this.reviewModel.findById(reviewId);
    }
    async createReview(user, slug, reviewDto) {
        const anime = await this.animeModel.findOne({ slug });
        if (!anime)
            throw new common_1.NotFoundException("Nie znaleziono anime o podanym slug.");
        const review = await new this.reviewModel(reviewDto);
        review.addedBy = user;
        review.addedTo = anime._id;
        anime.reviews.push(review._id);
        try {
            await review.save();
            await anime.save();
            return review;
        }
        catch (_a) {
            throw new common_1.BadRequestException("Nieprawidłowe dane wejściowe.");
        }
    }
    async editReview(user, reviewId, reviewDto) {
        const review = await this.getReviewById(reviewId);
        if (!review)
            throw new common_1.BadRequestException("Nie znaleziono podanej recenzji.");
        if (!review.addedBy.equals(user))
            throw new common_1.ForbiddenException("Nie masz uprawnień, aby edytować tą recenzje.");
        return await review.updateOne(reviewDto, {
            new: true,
        });
    }
    async deleteReview(user, reviewId) {
        const review = await this.getReviewById(reviewId);
        if (!review)
            throw new common_1.BadRequestException("Nie znaleziono podanej recenzji.");
        if (!review.addedBy.equals(user))
            throw new common_1.ForbiddenException("Nie masz uprawnień, aby usunąć tą recenzje.");
        return await review.deleteOne();
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(anime_schema_1.Anime.name)),
    __param(2, (0, common_1.Inject)("ANIME_SERVICE")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        anime_service_1.AnimeService])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map