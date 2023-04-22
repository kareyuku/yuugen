import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
import { encodePassword } from "src/utils/bcrypt";
import { Group } from "src/schemas/group.schema";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Group.name) private groupModel: Model<Group>
  ) {}

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
    return await this.userModel.findOne({ username });
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }

  async createGroup(groupDto: CreateGroupDto): Promise<Group> {
    const owner = await this.findUserByUsername(groupDto.owner.toString());

    if (!owner)
      throw new BadRequestException(
        "Użytkownik o podanej nazwie nie istnieje."
      );
    try {
      const group = new this.groupModel(groupDto);
      group.owner = owner._id;
      await group.save();
      return group;
    } catch {
      throw new InternalServerErrorException(
        "Tworzenie grupy nie powiodło się."
      );
    }
  }

  async findGroupByName(name: string): Promise<Group> {
    return await this.groupModel.findOne({ name });
  }

  async patchGroup(
    groupDto: CreateGroupDto,
    groupName: string
  ): Promise<Group> {
    if (groupDto.owner) {
      const owner = await this.findUserByUsername(groupDto.owner.toString());

      if (!owner)
        throw new BadRequestException(
          "Użytkownik o podanej nazwie nie istnieje."
        );

      groupDto.owner = owner._id;
    }
    try {
      return await this.groupModel.findOneAndUpdate(
        { name: groupName },
        groupDto,
        {
          returnOriginal: false,
        }
      );
    } catch {
      throw new InternalServerErrorException("Edycja grupy nie powiodła się.");
    }
  }

  async deleteGroup(groupName: string): Promise<void> {
   // return await this.groupModel.deleteOne({name: groupName});
  }
}
