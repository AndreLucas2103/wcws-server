import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsException,
    WsResponse,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { MessageDto } from '../dtos/teste.dto';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from '@/websocket/common/ws-jwt-auth.guard';

@UseGuards(new WsJwtAuthGuard('asd'))
@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class TesteGateway {
    @SubscribeMessage('teste')
    handleEvent(
        @ConnectedSocket() socket: Socket,
        /* @MessageBody() data: MessageDto, */
    ) {
        console.log('ok');
    }
}
