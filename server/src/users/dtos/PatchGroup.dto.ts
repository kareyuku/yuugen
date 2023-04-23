import { Allow, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class PatchGroupDto {
  @Allow()
  owner: string | Types.ObjectId;

  @Allow()
  name: string;

  @Allow()
  img: string;
}
