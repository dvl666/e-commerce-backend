import { IsNumber, IsString } from "class-validator";

export class CreateInventoryDto {

    @IsNumber()
    productId: number

    @IsString()
    sizeValue: string

    @IsNumber()
    stock: number

}
