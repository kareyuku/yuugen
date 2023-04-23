import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
import { encodePassword } from "src/utils/bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  async findUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }

  async createUser(userDto: CreateUserDto): Promise<void> {
    userDto.password = encodePassword(userDto.password);
    await this.addUser(userDto);
  }
}
