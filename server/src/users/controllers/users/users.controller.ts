import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Inject,
  NotFoundException,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { UsersService } from "src/users/services/users/users.service";
import MongooseClassSerializerInterceptor from "src/utils/mongooseClassSerializer.interceptor";
import { User } from "src/schemas/user.schema";
import { OKResponse } from "src/utils/responses";

@Controller("users")
export class UsersController {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
    return OKResponse("Pomyślnie zarejestrowano.");
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Get(":username")
  async getUserByUsername(@Param("username") username: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user) throw new NotFoundException("Nie znaleziono użytkownika.");
    return user;
  }
}
