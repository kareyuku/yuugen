import { IsNotEmpty } from "class-validator";

export class CreateAnimeDto {
    @IsNotEmpty()
    title: string;

    title_en: string;

    desc: string;

    img: string;
    banner: string;

    @IsNotEmpty()
    episodeCount: number;

    @IsNotEmpty()
    slug: string;

    
}