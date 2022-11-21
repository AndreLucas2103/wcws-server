import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';
import { TesteGateway } from './modules/usuario/events/teste/teste.gateway';

@Module({
    imports: [SocketModule],
    providers: [TesteGateway],
})
export class WebsocketsModule {}
