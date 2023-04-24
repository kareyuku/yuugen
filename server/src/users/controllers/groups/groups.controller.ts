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
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { AdminGuard, AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { PatchGroupDto } from "src/users/dtos/PatchGroup.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
import { OKResponse } from "src/utils/responses";

@Controller("groups")
export class GroupsController {
  constructor(
    @Inject("GROUP_SERVICE") private readonly groupService: GroupsService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto
  ) {
    await this.groupService.createGroup(
      createGroupDto,
      new Types.ObjectId(req.user.toString())
    );
    return OKResponse("Pomyślnie utworzono grupę.");
  }

  @Get(":groupId")
  async getGroup(@Param("groupId") groupId: string | Types.ObjectId) {
    try {
      groupId = new Types.ObjectId(groupId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }

    const foundGroup = await this.groupService.findGroupById(groupId);
    if (!foundGroup)
      throw new BadRequestException("Nie znaleziono podanej grupy.");

    return foundGroup;
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(":groupId")
  async patchGroup(
    @Body() patchGroupDto: PatchGroupDto,
    @Param("groupId") groupId: string | Types.ObjectId,
    @Req() req: Request
  ) {
    try {
      groupId = new Types.ObjectId(groupId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }
    return await this.groupService.patchGroup(
      patchGroupDto,
      groupId,
      new Types.ObjectId(req.user.toString())
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":groupId")
  async deleteGroup(
    @Param("groupId") groupId: string | Types.ObjectId,
    @Req() req: Request
  ) {
    try {
      groupId = new Types.ObjectId(groupId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }

    await this.groupService.deleteGroup(
      groupId,
      new Types.ObjectId(req.user.toString())
    );
    return OKResponse("Pomyślnie usunięto grupę.");
  }

  @UseGuards(AuthenticatedGuard)
  @Put(":groupId/:user")
  async addUserToGroup(
    @Param("groupId") groupId: string | Types.ObjectId,
    @Param("user") userToAdd: string,
    @Req() req: Request
  ) {
    try {
      groupId = new Types.ObjectId(groupId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }
    await this.groupService.addUserToGroup(
      groupId,
      userToAdd,
      new Types.ObjectId(req.user.toString())
    );
    return OKResponse("Pomyślnie dodano do grupy.");
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":groupId/:user")
  async removeUserFromGroup(
    @Param("groupId") groupId: string | Types.ObjectId,
    @Param("user") userToRemove: string,
    @Req() req: Request
  ) {
    try {
      groupId = new Types.ObjectId(groupId);
    } catch {
      throw new BadRequestException("Zły format id grupy.");
    }
    await this.groupService.removeUserFromGroup(
      groupId,
      userToRemove,
      new Types.ObjectId(req.user.toString())
    );
    return OKResponse("Pomyślnie usunięto z grupy.");
  }
}
