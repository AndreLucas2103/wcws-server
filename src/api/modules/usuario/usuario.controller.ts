import { AppResponse } from '@/api/error/AppResponse';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { Param, Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';

import * as bcrypt from 'bcryptjs';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuario: UsuarioService) {}

    @Get(':id')
    async find(@Param('id') id: string) {
        const usuario = await this.usuario.buscarId(id);

        return new AppResponse(usuario);
    }

    @Post()
    async create(@Body() data: CriarUsuarioDto) {
        const hash = await bcrypt.hash(data.senha, 10);

        await this.usuario.criar({
            ...data,
            senha: hash,
        });

        return;
    }
}
