import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class NovaMensagemDto {
    @IsNotEmpty()
    @IsString()
    idChat: string;

    @IsNotEmpty()
    @IsString()
    mensagem: string;

    @IsString()
    @IsOptional()
    idUsuario?: string;
}
