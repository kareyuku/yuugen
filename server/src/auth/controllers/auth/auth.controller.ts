import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "src/auth/utils/LocalGuard";
import { Request, Response } from "express";
import { UsersService } from "src/users/services/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request, @Res() res: Response) {
    return res.redirect("/api/users/" + req.body.username);
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get("status")
  async getAuthStatus(@Req() req: Request) {
    console.log(req);
    return req.user;
  }
}
