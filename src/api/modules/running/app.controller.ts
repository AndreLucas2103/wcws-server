import { UsuarioService } from '@/database/usuario/usuario.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor(private readonly usuario: UsuarioService) {}

    @Get()
    async getServerRun() {
        return 'Server is running';
    }

    @Get('teste')
    async teste() {
        return await this.usuario.proximoUsuarioFila();
    }
}
