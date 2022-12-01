import { AppError } from '@/api/error/AppError';
import { AppResponse } from '@/api/error/AppResponse';
import { authToken } from '@/common/config/authToken';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dtos/auth-login.dto';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

function generateToken(params = {}) {
    return jwt.sign(params, authToken.secret, {
        expiresIn: '7d',
    });
}

@ApiTags('usuario')
@Controller('usuario')
export class AuthController {
    constructor(private readonly usuario: UsuarioService) {}

    @Post('/auth/login')
    async authLogin(@Body() data: AuthLoginDto) {
        const usuario = await this.usuario.buscar(
            {
                email: data.email,
            },
            {
                selectSenha: true,
            },
        );

        if (!usuario) throw new AppError('Credênciais inválidas', 401);

        if (!(await bcrypt.compare(data.senha, usuario.senha)))
            throw new AppError('Credênciais inválidas', 401);

        usuario.senha = undefined;

        return new AppResponse({
            usuario,
            token: generateToken({ id: usuario._id }),
        });
    }
}
