import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarUsuarioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    senha: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    primeiroNome: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;
}
