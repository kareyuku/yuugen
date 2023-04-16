import { Request } from "express";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { ReviewsService } from "src/anime/services/reviews/reviews.service";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    createReview(req: Request, slug: string, createReviewDto: CreateReviewDto): Promise<import("../../../schemas/review.schema").Review>;
    editReview(req: Request, reviewId: string, createReviewDto: CreateReviewDto): Promise<import("../../../schemas/review.schema").Review>;
    deleteReview(req: Request, reviewId: string): Promise<void>;
}
