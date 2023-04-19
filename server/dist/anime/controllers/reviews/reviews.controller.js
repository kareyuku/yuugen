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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const CreateReview_dto_1 = require("../../dtos/CreateReview.dto");
const reviews_service_1 = require("../../services/reviews/reviews.service");
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const responses_1 = require("../../../utils/responses");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async createReview(req, slug, createReviewDto) {
        return await this.reviewsService.createReview(new mongoose_1.Types.ObjectId(req.user.toString()), slug, createReviewDto);
    }
    async editReview(req, reviewId, createReviewDto) {
        return await this.reviewsService.editReview(new mongoose_1.Types.ObjectId(req.user.toString()), new mongoose_1.Types.ObjectId(reviewId), createReviewDto);
    }
    async deleteReview(req, reviewId) {
        await this.reviewsService.deleteReview(new mongoose_1.Types.ObjectId(req.user.toString()), new mongoose_1.Types.ObjectId(reviewId));
        return (0, responses_1.OKResponse)('Pomyślnie usunięto recenzję.');
    }
};
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(":slug"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("slug")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateReview_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Patch)(":reviewId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("reviewId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateReview_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "editReview", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Delete)(":reviewId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("reviewId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteReview", null);
ReviewsController = __decorate([
    (0, common_1.Controller)("reviews"),
    __param(0, (0, common_1.Inject)("REVIEW_SERVICE")),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map