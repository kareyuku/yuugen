import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Group } from "src/schemas/group.schema";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { UsersService } from "../users/users.service";
import { User } from "src/schemas/user.schema";
import { PatchGroupDto } from "src/users/dtos/PatchGroup.dto";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject("USER_SERVICE") private readonly userService: UsersService
  ) {}

  async findGroupByName(name: string): Promise<Group> {
    return await this.groupModel.findOne({ name });
  }

  async getGroupData(id: Types.ObjectId): Promise<Group> {
    return await this.groupModel.findById(id).populate("members");
  }

  async findGroupById(id: Types.ObjectId): Promise<Group> {
    return await this.groupModel.findById(id);
  }

  async addGroup(
    groupDto: CreateGroupDto,
    ownerId: Types.ObjectId
  ): Promise<void> {
    await this.validateGroup(groupDto, ownerId);

    const group = new this.groupModel(groupDto);
    const owner = await this.userModel.findById(ownerId);

    try {
      group.owner = ownerId;
      owner.groups.push(group._id);
      await group.save();
      await owner.save();
    } catch {
      throw new InternalServerErrorException(
        "Tworzenie grupy nie powiodło się."
      );
    }
  }

  async validateGroup(
    groupDto: CreateGroupDto,
    ownerId: Types.ObjectId
  ): Promise<void> {
    if (!this.userModel.exists({ _id: ownerId }))
      throw new BadRequestException(
        "Użytkownik o podanej nazwie nie istnieje."
      );
  }

  async createGroup(groupDto: CreateGroupDto): Promise<void> {
    this.addGroup(groupDto, new Types.ObjectId(groupDto.owner));
  }

  async patchGroup(
    groupDto: PatchGroupDto,
    groupId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<Group> {
    const group = await this.groupModel.findById(groupId);

    if (!group) throw new BadRequestException("Nie znaleziono podanej grupy.");

    if (!this.userService.isUserAllowed(userId, group.owner))
      throw new ForbiddenException();

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
      return await group.updateOne(groupDto, { returnOriginal: false });
    } catch {
      throw new InternalServerErrorException("Edycja grupy nie powiodła się.");
    }
  }

  async deleteGroup(
    groupId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<void> {
    const group = await this.groupModel.findById(groupId);

    if (!group) throw new BadRequestException("Nie znaleziono podanej grupy.");

    if (!this.userService.isUserAllowed(userId, group.owner))
      throw new ForbiddenException();

    try {
      await group.deleteOne();
    } catch {
      throw new InternalServerErrorException(
        "Usuwanie grupy nie powiodło się."
      );
    }
  }

  async addUserToGroup(
    groupId: Types.ObjectId,
    userToAdd: string,
    userId: Types.ObjectId
  ) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new BadRequestException("Nie znaleziono podanej grupy.");

    if (!this.userService.isUserAllowed(userId, group.owner))
      throw new ForbiddenException();

    const user = await this.userModel.findOne({ username: userToAdd });
    if (!user)
      throw new BadRequestException("Użytkownik o takim id nie istnieje.");

    if (group.owner.equals(user._id))
      throw new BadRequestException(
        "Nie możesz dodać właściciela do jego własnej grupy."
      );

    if (group.members.includes(user._id))
      throw new BadRequestException(
        "Użytkownik o podanej nazwie jest już w grupie."
      );

    group.members.push(user._id);
    user.groups.push(group._id);

    try {
      await group.save();
      await user.save();
    } catch {
      throw new InternalServerErrorException(
        "Usuwanie grupy nie powiodło się."
      );
    }
  }

  async removeUserFromGroup(
    groupId: Types.ObjectId,
    userToRemove: string,
    userId: Types.ObjectId
  ) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new BadRequestException("Nie znaleziono podanej grupy.");

    if (!this.userService.isUserAllowed(userId, group.owner))
      throw new ForbiddenException();

    const user = await this.userModel.findOne({ username: userToRemove });
    if (!user)
      throw new BadRequestException("Użytkownik o takim id nie istnieje.");

    if (group.owner.equals(user._id))
      throw new BadRequestException(
        "Nie możesz usunąć właściciela z jego własnej grupy."
      );

    if (!group.members.includes(user._id))
      throw new BadRequestException("Takiego użytkownika nie ma w grupie.");

    group.members = group.members.filter((_user) => !_user.equals(user._id));
    user.groups = user.groups.filter((_group) => !_group.equals(group._id));

    try {
      await group.save();
      await user.save();
    } catch {
      throw new InternalServerErrorException(
        "Usuwanie grupy nie powiodło się."
      );
    }
  }
}
