import { Module } from "@nestjs/common";
import { AnimeController } from "./controllers/anime/anime.controller";
import { AnimeService } from "./services/anime/anime.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Anime, AnimeSchema } from "src/schemas/anime.schema";
import { ReviewsController } from "./controllers/reviews/reviews.controller";
import { ReviewsService } from "./services/reviews/reviews.service";
import { Review, ReviewSchema } from "src/schemas/review.schema";
import { UsersService } from "src/users/services/users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Anime.name, schema: AnimeSchema },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  controllers: [AnimeController, ReviewsController],
  providers: [
    {
      provide: "ANIME_SERVICE",
      useClass: AnimeService,
    },
    {
      provide: "REVIEW_SERVICE",
      useClass: ReviewsService,
    },
  ],
})
export class AnimeModule {}
