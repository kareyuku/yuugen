import { Allow, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {

  @IsNotEmpty()
  name: string;

  @Allow()
  img: string;
}
