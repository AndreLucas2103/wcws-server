import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ConnectionGateway {
    async handleConnection(client: Socket) {
        console.log(`client connecter ${client.id}`);
    }
}
