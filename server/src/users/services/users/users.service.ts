import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
import { encodePassword } from "src/utils/bcrypt";
import Ranks from "src/auth/utils/Ranks";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isUserAllowed(
    userId: Types.ObjectId,
    matchId: Types.ObjectId
  ): Promise<boolean> {
    const user = await this.findUserById(userId);

    return user._id.equals(matchId) || user.rank === Ranks.Admin;
  }

  async addUser(userDto: CreateUserDto): Promise<User> {
    const addedUser = new this.userModel(userDto);

    try {
      return await addedUser.save();
    } catch (err) {
      if (err.keyValue.username)
        throw new ConflictException("Nazwa użytkownika jest już zajęta.", {
          description: "username",
        });
      if (err.keyValue.email)
        throw new ConflictException("Ten adres e-mail jest już zajęty.", {
          description: "email",
        });
    }
  }

  async getAllAboutUser(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id).populate("groups");
  }

  async findUserByUsername(
    username: string,
    groupsPopulate: boolean = false
  ): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return groupsPopulate ? await user.populate("groups") : user;
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }

  async createUser(userDto: CreateUserDto): Promise<void> {
    userDto.password = encodePassword(userDto.password);
    await this.addUser(userDto);
  }
}
