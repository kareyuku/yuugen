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
import { Anime } from "src/schemas/anime.schema";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Anime.name) private animeModel: Model<Anime>,
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  async getReviewById(reviewId: Types.ObjectId) {
    return await this.reviewModel.findById(reviewId);
  }

  // to do one user one review !!
  async createReview(
    user: Types.ObjectId,
    slug: string,
    reviewDto: CreateReviewDto
  ): Promise<Review> {
    const anime = await this.animeModel.findOne({ slug });
    if (!anime)
      throw new NotFoundException("Nie znaleziono anime o podanym slug.");

    const review = await new this.reviewModel(reviewDto);

    review.addedBy = user;
    review.addedTo = anime._id;
    anime.reviews.push(review._id);

    try {
      await review.save();
      await anime.save();
      return review;
    } catch {
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
 // to do remove from anime
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
