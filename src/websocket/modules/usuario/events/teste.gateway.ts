import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsException,
    WsResponse,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { MessageDto } from '../dtos/Teste.dto';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { Socket } from 'socket.io';
import { WsGuard } from 'src/websocket/common/auth.service';

@UseGuards(WsGuard)
@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class TesteGateway {
    @SubscribeMessage('teste')
    handleEvent(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: MessageDto,
    ) {
        console.log(socket.handshake.auth);
    }
}
