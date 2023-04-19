import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
import { encodePassword } from "src/utils/bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const password = encodePassword(userDto.password);
    try {
      const createdUser = new this.userModel({ ...userDto, password });
      await createdUser.save();
      return createdUser;
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
    return this.userModel.findOne({ username });
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }
}
