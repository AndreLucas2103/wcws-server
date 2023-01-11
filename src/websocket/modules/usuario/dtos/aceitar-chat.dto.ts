import { IsNotEmpty, IsString } from 'class-validator';

export class AceitarChatDto {
    @IsNotEmpty()
    @IsString()
    idChat: string;

    @IsNotEmpty()
    @IsString()
    idUsuario: string;
}
