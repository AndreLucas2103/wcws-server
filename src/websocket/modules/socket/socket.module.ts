import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ConnectionGateway } from './events/connection.gateway';
import { DisconnectGateway } from './events/disconnect.gateway';

@Module({
    imports: [DatabaseModule],
    providers: [ConnectionGateway, DisconnectGateway],
})
export class SocketModule {}
