import { Allow, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {
  @IsNotEmpty()
  owner: string | Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @Allow()
  img: string;
}
