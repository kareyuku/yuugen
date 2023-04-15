import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Types } from "mongoose";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {
    super();
  }

  serializeUser(
    userId: Types.ObjectId,
    done: (err, userId: Types.ObjectId) => void
  ) {
    done(null, userId);
  }

  async deserializeUser(
    userId: Types.ObjectId,
    done: (err, userId: Types.ObjectId) => void
  ) {
    const userDB = await this.userService.findUserById(userId);

    return userDB ? done(null, userId) : done(null, null);
  }
}
