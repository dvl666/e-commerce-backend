import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from "class-validator";

export class AddProductsDto {

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    @IsPositive({ each: true })
    productsToAdd: number[]

}