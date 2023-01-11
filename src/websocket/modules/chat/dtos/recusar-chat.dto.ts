import { IsNotEmpty, IsString } from 'class-validator';

export class RecusarChatDto {
    @IsNotEmpty()
    @IsString()
    idChat: string;
}
