import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Types } from "mongoose";
import { UsersService } from "src/users/services/users/users.service";
import Ranks from "./Ranks";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated();
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.isAuthenticated()) return false;

    const user = await this.userService.findUserById(
      new Types.ObjectId(req.user.toString())
    );

    return user.rank === Ranks.Admin;
  }
}
