import { Controller, Get, Post, Req, Session, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "src/auth/utils/LocalGuard";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login() {}

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get("status")
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
