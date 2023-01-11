import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { IniciarChatGateway } from './events/iniciar-chat.gateway';
import { RecusarChatGateway } from './events/recusar-chat.gateway';

@Module({
    providers: [IniciarChatGateway, RecusarChatGateway],
    imports: [DatabaseModule],
})
export class ChatModule {}
