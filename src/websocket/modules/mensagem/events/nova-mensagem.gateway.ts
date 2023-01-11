import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { WsJwtAuthGuard } from '@/websocket/common/ws-jwt-auth.guard';
import { ChatService } from '@/database/chat/chat.service';
import { Socket } from '@/websocket/common/types/Socket';
import { NovaMensagemDto } from '../dtos/nova-mensagem.dto';
import { MensagemService } from '@/database/mensagem/mensagem.service';
import { Server } from 'socket.io';
import { SocketSend } from '@/websocket/common/types/SocketSend';

@UseGuards(WsJwtAuthGuard)
@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class NovaMensagemGateway {
    constructor(
        private usuario: UsuarioService,
        private chat: ChatService,
        private mensagem: MensagemService,
    ) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('nova_mensagem')
    async handleEvent(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: NovaMensagemDto,
    ) {
        const chat = await this.chat.buscarId(data.idChat);

        if (!chat) throw new WsException('Sala não encontrada');

        console.log(data);

        const mensagem = await this.mensagem.criar({
            idChat: chat._id as any,
            mensagem: data.mensagem,
            idUsuario: data.idUsuario,
        });

        await mensagem.populate('usuario');

        this.io.to(chat.uid).emit(
            'nova_mensagem',
            new SocketSend({
                mensagem,
                chat,
            }),
        );

        return new SocketSend();
    }
}
