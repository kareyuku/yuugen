import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class ControllersController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login() {}
}
