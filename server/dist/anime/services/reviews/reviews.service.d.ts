import { Model } from "mongoose";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { Review } from "src/schemas/review.schema";
import { AnimeService } from "../anime/anime.service";
export declare class ReviewsService {
    private reviewModel;
    private readonly animeService;
    constructor(reviewModel: Model<Review>, animeService: AnimeService);
    createReview(user: string, slug: string, reviewDto: CreateReviewDto): Promise<void>;
}
