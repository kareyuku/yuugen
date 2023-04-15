import { Module } from "@nestjs/common";
import { AnimeController } from "./controllers/anime/anime.controller";
import { AnimeService } from "./services/anime/anime.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Anime, AnimeSchema } from "src/schemas/anime.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [AnimeController],
  providers: [
    {
      provide: "ANIME_SERVICE",
      useClass: AnimeService,
    },
  ],
})
export class AnimeModule {}
