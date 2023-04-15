import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    content: string;

    @IsPositive()
    rate: number;
}