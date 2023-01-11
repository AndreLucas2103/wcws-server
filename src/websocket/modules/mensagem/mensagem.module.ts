import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { NovaMensagemGateway } from './events/nova-mensagem.gateway';

@Module({
    providers: [NovaMensagemGateway],
    imports: [DatabaseModule],
})
export class MensagemModule {}
