import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AdminGuard } from "src/auth/utils/LocalGuard";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
import { OKResponse } from "src/utils/responses";

@Controller("groups")
export class GroupsController {
  constructor(
    @Inject("GROUP_SERVICE") private readonly groupService: GroupsService
  ) {}

  @UseGuards(AdminGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    await this.groupService.createGroup(createGroupDto);
    return OKResponse("Pomyślnie utworzono grupę.");
  }

  @Get(":group")
  async getGroup(@Param("group") group: string) {
    const createdGroup = await this.groupService.findGroupByName(group);

    if (!createdGroup)
      throw new BadRequestException("Nie znaleziono podanej grupy.");

    return group;
  }

  @UseGuards(AdminGuard)
  @Patch(":group")
  async patchGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Param("group") group: string
  ) {
    return await this.groupService.patchGroup(createGroupDto, group);
  }

  @UseGuards(AdminGuard)
  @Delete(":group")
  async deleteGroup(@Param("group") group: string) {
    await this.groupService.deleteGroup(group);
    return OKResponse("Pomyślnie usunięto grupę.");
  }
}
