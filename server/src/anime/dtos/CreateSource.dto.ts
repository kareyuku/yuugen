import { Allow, IsNotEmpty } from "class-validator";

export class CreateSourceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  //@IsNotEmpty()
  @Allow()
  group: string;
}
