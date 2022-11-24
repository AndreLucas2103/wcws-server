import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
    imports: [SocketModule, UsuarioModule],
    providers: [],
})
export class WebsocketsModule {}
