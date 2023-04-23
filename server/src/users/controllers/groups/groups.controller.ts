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
import { Types } from "mongoose";
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

  @Get(":groupId")
  async getGroup(@Param("groupId") groupId: string) {
    const foundGroup = await this.groupService.findGroupById(
      new Types.ObjectId(groupId)
    );

    if (!foundGroup)
      throw new BadRequestException("Nie znaleziono podanej grupy.");

    return foundGroup;
  }

  @UseGuards(AdminGuard)
  @Patch(":groupId")
  async patchGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Param("groupId") groupId: string
  ) {
    return await this.groupService.patchGroup(
      createGroupDto,
      new Types.ObjectId(groupId)
    );
  }

  @UseGuards(AdminGuard)
  @Delete(":groupId")
  async deleteGroup(@Param("groupId") groupId: string) {
    await this.groupService.deleteGroup(new Types.ObjectId(groupId));
    return OKResponse("Pomyślnie usunięto grupę.");
  }
}
