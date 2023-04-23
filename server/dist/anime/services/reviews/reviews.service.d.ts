/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from "mongoose";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { Review } from "src/schemas/review.schema";
import { AnimeService } from "../anime/anime.service";
import { Anime } from "src/schemas/anime.schema";
export declare class ReviewsService {
    private reviewModel;
    private animeModel;
    private readonly animeService;
    constructor(reviewModel: Model<Review>, animeModel: Model<Anime>, animeService: AnimeService);
    getReviewById(reviewId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Review> & Omit<Review & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    createReview(user: Types.ObjectId, slug: string, reviewDto: CreateReviewDto): Promise<Review>;
    editReview(user: Types.ObjectId, reviewId: Types.ObjectId, reviewDto: CreateReviewDto): Promise<Review>;
    deleteReview(user: Types.ObjectId, reviewId: Types.ObjectId): Promise<boolean>;
}
