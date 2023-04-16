import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { Review } from "src/schemas/review.schema";
import { AnimeService } from "../anime/anime.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  async getReviewById(reviewId: Types.ObjectId) {
    return await this.reviewModel.findById(reviewId);
  }

  async createReview(
    user: Types.ObjectId,
    slug: string,
    reviewDto: CreateReviewDto
  ): Promise<Review> {
    const anime = await this.animeService.getAnimeBySlug(slug);
    if (!anime)
      throw new NotFoundException("Nie znaleziono anime o podanym slug.");

    const review = await new this.reviewModel(reviewDto);

    review.addedBy = user;
    review.addedTo = anime._id;

    try {
      review.save();
      return review;
    } catch (err) {
      throw new BadRequestException("Nieprawidłowe dane wejściowe.");
    }
  }

  async editReview(
    user: Types.ObjectId,
    reviewId: Types.ObjectId,
    reviewDto: CreateReviewDto
  ): Promise<Review> {
    const review = await this.getReviewById(reviewId);

    if (!review)
      throw new BadRequestException("Nie znaleziono podanej recenzji.");

    if (!review.addedBy.equals(user))
      throw new ForbiddenException(
        "Nie masz uprawnień, aby edytować tą recenzje."
      );

    return await review.updateOne(reviewDto, {
      new: true,
    });
  }

  async deleteReview(
    user: Types.ObjectId,
    reviewId: Types.ObjectId
  ): Promise<boolean> {
    const review = await this.getReviewById(reviewId);

    if (!review)
      throw new BadRequestException("Nie znaleziono podanej recenzji.");

    if (!review.addedBy.equals(user))
      throw new ForbiddenException(
        "Nie masz uprawnień, aby usunąć tą recenzje."
      );
    return await review.deleteOne();
  }
}
