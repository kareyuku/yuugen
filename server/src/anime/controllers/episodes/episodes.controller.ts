import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { EpisodesService } from "src/anime/services/episodes/episodes.service";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { OKResponse } from "src/utils/responses";

@Controller("episodes")
export class EpisodesController {
  constructor(
    @Inject("EPISODES_SERVICE")
    private readonly episodesService: EpisodesService
  ) {}

  @Post(":slug")
  @UseGuards(AdminGuard)
  @UsePipes(ValidationPipe)
  async createEpisode(
    @Body() createEpisodeDto: CreateEpisodeDto,
    @Param("slug") slug: string
  ) {
    await this.episodesService.createEpisode(createEpisodeDto, slug);
    return OKResponse("Pomyślnie dodano epizod.");
  }

  @Delete(":slug/:episode")
  @UseGuards(AdminGuard)
  async deleteEpisode(
    @Param("slug") slug: string,
    @Param("episode") episode: string
  ) {
    await this.episodesService.deleteEpisode(slug, parseInt(episode));
    return OKResponse('Pomyślnie usunięto epizod.')
  }
}
