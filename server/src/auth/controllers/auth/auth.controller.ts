import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/utils/LocalGuard";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request, @Res() res: Response) {
    return res.redirect("/api/users/" + req.body.username);
  }
}
