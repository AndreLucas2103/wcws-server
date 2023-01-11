import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
    WsResponse,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { MessageDto } from '../dtos/teste.dto';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { Socket, Server } from 'socket.io';
import { WsJwtAuthGuard } from '@/websocket/common/ws-jwt-auth.guard';

@WebSocketGateway()
export class TesteGateway {
    @WebSocketServer()
    io: Server;

    @SubscribeMessage('client-server')
    handleEvent(
        @ConnectedSocket() socket: Socket,
        /* @MessageBody() data: MessageDto, */
    ) {
        socket.emit('server to client event', 200);
    }

    @SubscribeMessage('clients-count')
    handleEvent2() {
        console.log(this.io.sockets.adapter.rooms.size);
    }
}
