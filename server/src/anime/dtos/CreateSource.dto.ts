import { Allow, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateSourceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  //@IsNotEmpty()
  @Allow()
  group: Types.ObjectId;
}
