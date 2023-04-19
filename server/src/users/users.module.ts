import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users/users.controller";
import { UsersService } from "./services/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, UserController],
  providers: [
    {
      provide: "USER_SERVICE",
      useClass: UsersService,
    },
  ],
  exports: ["USER_SERVICE"],
})
export class UsersModule {}
