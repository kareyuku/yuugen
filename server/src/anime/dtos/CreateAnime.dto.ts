import { Allow, IsNotEmpty } from "class-validator";

export class CreateAnimeDto { // to change limits
  @IsNotEmpty()
  title: string;

  @Allow()
  title_en: string;

  @Allow()
  desc: string;

  @Allow()
  img: string;
  
  @Allow()
  rate: number;

  @Allow()
  banner: string;

  @IsNotEmpty()
  episodeCount: number;

  @IsNotEmpty()
  slug: string;
}
