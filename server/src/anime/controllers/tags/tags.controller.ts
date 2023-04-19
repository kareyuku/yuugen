import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TagsService } from "src/anime/services/tags/tags.service";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { Tag } from "src/schemas/tag.schema";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";
import { OKResponse } from "src/utils/responses";

@Controller("tags")
export class TagsController {
  constructor(
    @Inject("TAGS_SERVICE") private readonly tagsService: TagsService
  ) {}

  @UseGuards(AdminGuard)
  @Post(":tag")
  async createTag(@Param("tag") tag: string) {
    await this.tagsService.createTag(tag);
    return OKResponse("Pomyślnie utworzono tag.");
  }

  @Get()
  @UseInterceptors(MongooseClassSerializerInterceptor(Tag))
  async getTags() {
    return await this.tagsService.getAllTags();
  }
}
