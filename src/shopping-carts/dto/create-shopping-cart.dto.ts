import { IsNumber, IsString } from "class-validator";

export class CreateShoppingCartDto {

    @IsNumber()
    userId: number

}
