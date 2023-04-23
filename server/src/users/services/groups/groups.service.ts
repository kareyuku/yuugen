import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "src/schemas/group.schema";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  async findGroupByName(name: string): Promise<Group> {
    return await this.groupModel.findOne({ name });
  }

  async createGroup(groupDto: CreateGroupDto): Promise<Group> {
    const owner = await this.userService.findUserByUsername(
      groupDto.owner.toString()
    );

    if (!owner)
      throw new BadRequestException(
        "Użytkownik o podanej nazwie nie istnieje."
      );
    try {
      const group = new this.groupModel(groupDto);
      group.owner = owner._id;
      return await group.save();
    } catch {
      throw new InternalServerErrorException(
        "Tworzenie grupy nie powiodło się."
      );
    }
  }

  async patchGroup(
    groupDto: CreateGroupDto,
    groupName: string
  ): Promise<Group> {
    if (groupDto.owner) {
      const owner = await this.userService.findUserByUsername(
        groupDto.owner.toString()
      );

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
    const group = await this.groupModel.findOne({ name: groupName });

    if (!group) throw new BadRequestException("Nie znaleziono podanej grupy.");

    try {
      await group.deleteOne();
    } catch {
      throw new InternalServerErrorException(
        "Usuwanie grupy nie powiodło się."
      );
    }
  }
}
