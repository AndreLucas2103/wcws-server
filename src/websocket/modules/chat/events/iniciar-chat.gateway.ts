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
import { IniciarChatDto } from '../dtos/iniciar-chat.dto';
import { authToken } from '@/common/config/authToken';

import * as jwt from 'jsonwebtoken';
import { UsuarioService } from '@/database/usuario/usuario.service';

function generateToken(params = {}) {
    return jwt.sign(params, authToken.secret, {
        expiresIn: '7d',
    });
}

@WebSocketGateway()
export class IniciarChatGateway {
    constructor(private chat: ChatService, private usuario: UsuarioService) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('iniciar_chat')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: IniciarChatDto,
    ) {
        const usuario = await this.usuario.proximoUsuarioFila();

        const chat = await this.chat.criar({
            usuarioFila: usuario ? usuario._id.toString() : null,
            nome: data.nome,
            email: data.email,
            socketId: socket.id,
        });

        socket.join(chat.uid);

        if (usuario) {
            this.io
                .to(usuario.socketId)
                .emit('novo_chat', new SocketSend({ chat }));
        }

        return new SocketSend({
            chat,
            token: generateToken({ idChat: chat._id, isUsuario: false }),
        });
    }
}
