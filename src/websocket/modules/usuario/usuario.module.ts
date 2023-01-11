import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AceitarChatGateway } from './events/aceitar-chat.gateway';
import { AtualizarStatusGateway } from './events/atualizar-status.gateway';
import { TesteGateway } from './events/teste.gateway';

@Module({
    providers: [TesteGateway, AtualizarStatusGateway, AceitarChatGateway],
    imports: [DatabaseModule],
})
export class UsuarioModule {}
