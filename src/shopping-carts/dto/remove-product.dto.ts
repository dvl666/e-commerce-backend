import { IsInt, IsNotEmpty } from "class-validator";

export class removeProductDto {

    @IsInt()
    @IsNotEmpty()
    productId: number

}