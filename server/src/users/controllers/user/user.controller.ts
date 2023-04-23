import {
  Controller,
  Get,
  Inject,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/services/users/users.service";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";

@Controller("user")
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @UseGuards(AuthenticatedGuard)
  @Get()
  async getUser(@Req() req: Request) {
    return await this.userService.getAllAboutUser(
      new Types.ObjectId(req.user.toString())
    );
  }
}
