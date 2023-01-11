import { IsNotEmpty, IsString } from 'class-validator';

export class IniciarChatDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}
