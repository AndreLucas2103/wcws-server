import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ChatModule } from './chat/chat.module';
import { MensagemModule } from './mensagem/mensagem.module';

@Module({
    imports: [UsuarioModule, ChatModule, MensagemModule],
    exports: [UsuarioModule, ChatModule, MensagemModule],
})
export class DatabaseModule {}
