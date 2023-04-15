import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { Review } from "src/schemas/review.schema";
import { AnimeService } from "../anime/anime.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  async createReview(
    user: string,
    slug: string,
    reviewDto: CreateReviewDto
  ) /*: Promise<Review>*/ {
    const anime = await this.animeService.getAnimeBySlug(slug);
    if (!anime)
      throw new NotFoundException("Nie znaleziono anime o podanym slug.");

    const review = await new this.reviewModel(reviewDto);

    review.addedBy = new Schema.Types.ObjectId(user); // wtf
    review.addedTo = new Schema.Types.ObjectId(anime._id.toString()); // wtf

    review.save();

    // to do
  }
}
