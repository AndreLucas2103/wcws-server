import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { CallbackError, SocketSend } from '@/websocket/common/types/SocketSend';
import { WsJwtAuthGuard } from '@/websocket/common/ws-jwt-auth.guard';
import { ChatService } from '@/database/chat/chat.service';
import { AceitarChatDto } from '../dtos/aceitar-chat.dto';
import { Socket } from '@/websocket/common/types/Socket';

@UseGuards(WsJwtAuthGuard)
@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class AceitarChatGateway {
    constructor(private usuario: UsuarioService, private chat: ChatService) {}

    @SubscribeMessage('usuario_aceitar_chat')
    async handleEvent(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: AceitarChatDto,
    ) {
        const usuario = await this.usuario.buscarId(data.idUsuario);

        const chat = await this.chat.buscarId(data.idChat);

        if (chat.socketId === null)
            return new CallbackError('Chat reconectando');

        chat.usuarioResponsavel = [usuario._id.toString()];
        chat.situacao = 2;
        chat.usuarioFila = null;

        await (await chat.save()).populate('usuarioResponsavel');

        socket.join(chat.uid);

        socket
            .to(chat.uid)
            .emit('usuario_aceitar_chat', new SocketSend({ chat: chat }));

        return new SocketSend({
            chat: chat,
        });
    }
}
