import {
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
import { UsersService } from "src/users/services/users/users.service";
import { OKResponse } from "src/utils/responses";

@Controller("groups")
export class GroupsController {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  @UseGuards(AdminGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.userService.createGroup(createGroupDto);
  }

  @Get(":group")
  async getGroup(@Param("group") group: string) {
    return await this.userService.getGroup(group);
  }

  @UseGuards(AdminGuard)
  @Patch(":group")
  async patchGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Param("group") group: string
  ) {
    return await this.userService.patchGroup(createGroupDto, group);
  }

  @UseGuards(AdminGuard)
  @Delete(":group")
  async deleteGroup(@Param("group") group: string) {
    await this.userService.deleteGroup(group);
    return OKResponse("Pomyślnie usunięto grupę.");
  }
}
