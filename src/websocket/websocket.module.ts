import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ChatModule } from './modules/chat/chat.module';
import { MensagemModule } from './modules/mensagem/mensagem.module';

@Module({
    imports: [SocketModule, UsuarioModule, ChatModule, MensagemModule],
})
export class WebsocketsModule {}
