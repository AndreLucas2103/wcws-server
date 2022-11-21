import { Module } from '@nestjs/common';
import { ConnectionGateway } from './events/connection.gateway';
import { DisconnectGateway } from './events/disconnect.gateway';

@Module({
    providers: [ConnectionGateway, DisconnectGateway],
})
export class SocketModule {}
