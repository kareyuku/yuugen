import { Module, forwardRef } from "@nestjs/common";
import { AnimeController } from "./controllers/anime/anime.controller";
import { AnimeService } from "./services/anime/anime.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Anime, AnimeSchema } from "src/schemas/anime.schema";
import { ReviewsController } from "./controllers/reviews/reviews.controller";
import { ReviewsService } from "./services/reviews/reviews.service";
import { Review, ReviewSchema } from "src/schemas/review.schema";
import { UsersModule } from "src/users/users.module";
import { TagsService } from "./services/tags/tags.service";
import { TagsController } from "./controllers/tags/tags.controller";
import { Tag, TagSchema } from "src/schemas/tag.schema";
import { EpisodesService } from "./services/episodes/episodes.service";
import { EpisodesController } from "./controllers/episodes/episodes.controller";
import { ProposalsModule } from "src/proposals/proposals.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Anime.name, schema: AnimeSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    forwardRef(() => ProposalsModule),
    UsersModule,
  ],
  controllers: [
    AnimeController,
    ReviewsController,
    TagsController,
    EpisodesController,
  ],
  providers: [
    {
      provide: "ANIME_SERVICE",
      useClass: AnimeService,
    },
    {
      provide: "REVIEW_SERVICE",
      useClass: ReviewsService,
    },
    {
      provide: "TAGS_SERVICE",
      useClass: TagsService,
    },
    {
      provide: "EPISODE_SERVICE",
      useClass: EpisodesService,
    },
  ],
  exports: ["ANIME_SERVICE"],
})
export class AnimeModule {}
