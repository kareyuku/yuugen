import {
  Body,
  Controller,
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

  @UseGuards(AdminGuard)
  @Patch(":group")
  async patchGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Param("group") group: string
  ) {
    return await this.userService.patchGroup(createGroupDto, group);
  }
}
