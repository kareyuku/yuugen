import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users/users.controller";
import { UsersService } from "./services/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserController } from "./controllers/user/user.controller";
import { GroupsController } from "./controllers/groups/groups.controller";
import { Group, GroupSchema } from "src/schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [UsersController, UserController, GroupsController],
  providers: [
    {
      provide: "USER_SERVICE",
      useClass: UsersService,
    },
  ],
  exports: ["USER_SERVICE"],
})
export class UsersModule {}
