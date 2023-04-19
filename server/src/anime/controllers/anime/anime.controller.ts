import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SortOrder, Types } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { Anime } from "src/schemas/anime.schema";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";
import { OKResponse } from "src/utils/responses";

@Controller("anime")
export class AnimeController {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  @UseGuards(AdminGuard)
  async createAnime(@Body() createAnimeDto: CreateAnimeDto) {
    await this.animeService.createAnime(createAnimeDto);
    return OKResponse("Pomyślnie utworzono anime.");
  }

  @Get(":slug")
  @UseInterceptors(MongooseClassSerializerInterceptor(Anime))
  async getAnimeBySlug(@Param("slug") slug: string) {
    const anime = await this.animeService.getAnimeBySlug(slug);
    if (!anime) throw new NotFoundException("Nie znaleziono anime.");
    return anime;
  }

  @Get()
  @UseInterceptors(MongooseClassSerializerInterceptor(Anime))
  async getAnime(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("sort_by") sortBy: string,
    @Query("sort_order") sortOrder: string
  ) {
    return this.animeService.getAnime(
      parseInt(page),
      parseInt(limit),
      sortBy,
      sortOrder as SortOrder
    );
  }

  @UseGuards(AdminGuard)
  @Patch(":slug")
  async patchAnimeBySlug(
    @Param("slug") slug: string,
    @Body() createAnimeDto: CreateAnimeDto
  ) {
    return await this.animeService.patchAnimeBySlug(slug, createAnimeDto);
  }
}
