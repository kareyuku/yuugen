import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateEpisodeDto } from "src/anime/dtos/CreateEpisode.dto";
import { CreateSourceDto } from "src/anime/dtos/CreateSource.dto";
import { EpisodesService } from "src/anime/services/episodes/episodes.service";
import { AdminGuard, AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { OKResponse } from "src/utils/responses";
import { Request } from "express";
import { Types } from "mongoose";

@Controller("episodes")
export class EpisodesController {
  constructor(
    @Inject("EPISODE_SERVICE")
    private readonly episodesService: EpisodesService
  ) {}

  @Post(":slug")
  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  async createEpisode(
    @Body() createEpisodeDto: CreateEpisodeDto,
    @Param("slug") slug: string,
    @Req() req: Request
  ) {
    return OKResponse(
      await this.episodesService.createEpisode(
        createEpisodeDto,
        slug,
        new Types.ObjectId(req.user.toString())
      )
    );
  }

  @Delete(":slug/:episode")
  @UseGuards(AdminGuard)
  async deleteEpisode(
    @Param("slug") slug: string,
    @Param("episode") episode: string
  ) {
    await this.episodesService.deleteEpisode(slug, parseInt(episode));
    return OKResponse("Pomyślnie usunięto epizod.");
  }

  @Post(":slug/:episode")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async createSource(
    @Param("slug") slug: string,
    @Param("episode") episode: string,
    @Body() createSourceDto: CreateSourceDto,
    @Req() req: Request
  ) {
    return OKResponse(
      await this.episodesService.createSource(
        slug,
        parseInt(episode),
        createSourceDto,
        new Types.ObjectId(req.user.toString())
      )
    );
  }
}
