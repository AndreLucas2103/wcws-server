import { ChatService } from '@/database/chat/chat.service';
import { SocketSend } from '@/websocket/common/types/SocketSend';
import { Socket } from '@/websocket/common/types/Socket';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { UsuarioService } from '@/database/usuario/usuario.service';
import { RecusarChatDto } from '../dtos/recusar-chat.dto';

@WebSocketGateway()
export class RecusarChatGateway {
    constructor(private chat: ChatService, private usuario: UsuarioService) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('recusar_chat')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: RecusarChatDto,
    ) {
        const usuario = await this.usuario.proximoUsuarioFila();

        if (usuario) {
            await this.chat.atualizar(data.idChat, {
                usuarioFila: usuario,
            });

            const chat = await this.chat.buscarId(data.idChat);

            this.io
                .to(usuario.socketId)
                .emit('novo_chat', new SocketSend({ chat }));
        } else {
            await this.chat.atualizar(data.idChat, {
                usuarioFila: null,
            });
        }
    }
}
