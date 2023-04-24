import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SortOrder, Types } from "mongoose";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";
import { AdminGuard, AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { Anime } from "src/schemas/anime.schema";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";
import { OKResponse } from "src/utils/responses";
import { Request } from "express";

@Controller("anime")
export class AnimeController {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async createAnime(
    @Body() createAnimeDto: CreateAnimeDto,
    @Req() req: Request
  ) {
    return OKResponse(
      await this.animeService.createAnime(
        createAnimeDto,
        new Types.ObjectId(req.user.toString())
      )
    );
  }

  @Get(":slug")
  @UseInterceptors(MongooseClassSerializerInterceptor(Anime))
  async getAnimeBySlug(@Param("slug") slug: string) {
    return await this.animeService.getAnimeData(slug);
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
