import { Allow, IsNotEmpty } from "class-validator";

export class CreateEpisodeDto {
  @IsNotEmpty()
  number: number;

  @Allow()
  img: string;

  @Allow()
  title: string;

  @Allow()
  desc: string;
}
