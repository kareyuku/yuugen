import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateAnimeDto } from "src/anime/dtos/CreateAnime.dto";
import { AnimeService } from "src/anime/services/anime/anime.service";

@Controller("anime")
export class AnimeController {
  constructor(
    @Inject("ANIME_SERVICE") private readonly animeService: AnimeService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async createUser(@Body() createAnimeDto: CreateAnimeDto) {
    return await this.animeService.createAnime(createAnimeDto);
  }

  @Get(":slug")
  async getAnimeBySlug(@Param("slug") slug: string) {
    const anime = await this.animeService.getAnimeBySlug(slug);
    if (!anime) throw new NotFoundException("Nie znaleziono anime.");
    return anime;
  }

  @Patch(":slug")
  async patchAnimeBySlug(
    @Param("slug") slug: string,
    @Body() createAnimeDto: CreateAnimeDto
  ) {
    return await this.animeService.patchAnimeBySlug(slug, createAnimeDto);
  }
}
