import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { CreateReviewDto } from "src/anime/dtos/CreateReview.dto";
import { ReviewsService } from "src/anime/services/reviews/reviews.service";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";

@Controller("reviews")
export class ReviewsController {
  constructor(
    @Inject("REVIEW_SERVICE") private readonly reviewsService: ReviewsService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  @Post(":slug")
  async createReview(
    @Req() req: Request,
    @Param("slug") slug: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return await this.reviewsService.createReview(
      new Types.ObjectId(req.user.toString()),
      slug,
      createReviewDto
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(":reviewId")
  async editReview(
    @Req() req: Request,
    @Param("reviewId") reviewId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return await this.reviewsService.editReview(
      new Types.ObjectId(req.user.toString()),
      new Types.ObjectId(reviewId),
      createReviewDto
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":reviewId")
  async deleteReview(@Req() req: Request, @Param("reviewId") reviewId: string) {
    await this.reviewsService.deleteReview(
      new Types.ObjectId(req.user.toString()),
      new Types.ObjectId(reviewId)
    );
  }
}
