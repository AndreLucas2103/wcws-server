import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class DisconnectGateway {
    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log(`client disconnect ${socket.id}`);
    }
}
