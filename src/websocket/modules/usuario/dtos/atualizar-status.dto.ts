import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AtualizarStatusDto {
    @IsNotEmpty()
    @IsString()
    idUsuario: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;
}
