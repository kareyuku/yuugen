import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth/auth.controller";
import { AuthService } from "./services/auth/auth.service";
import { UsersService } from "src/users/services/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { LocalStrategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";
import { Group, GroupSchema } from "src/schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
    {
      provide: "USER_SERVICE",
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
