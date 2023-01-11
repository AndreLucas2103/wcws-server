import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { UsePipes, UseGuards } from '@nestjs/common';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { AtualizarStatusDto } from '../dtos/atualizar-status.dto';
import { SocketSend } from '@/websocket/common/types/SocketSend';
import { WsJwtAuthGuard } from '@/websocket/common/ws-jwt-auth.guard';
import { ChatService } from '@/database/chat/chat.service';
import { Server } from 'socket.io';

@UseGuards(WsJwtAuthGuard)
@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class AtualizarStatusGateway {
    constructor(private usuario: UsuarioService, private chat: ChatService) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('usuario_atualizar_status')
    async handleEvent(@MessageBody() data: AtualizarStatusDto) {
        await this.usuario.atualizar(data.idUsuario, {
            statusChat: data.status,
        });

        if (data.status === 1) {
            const chats = await this.chat.buscarTodos({
                usuarioFila: null,
                situacao: 1,
            });

            if (chats.length > 0) {
                const promises = chats.map(async (c) => {
                    const [, usuario] = await Promise.all([
                        this.chat.atualizar(c.id, {
                            usuarioFila: data.idUsuario,
                        }),
                        this.usuario.buscarId(data.idUsuario),
                    ]);

                    this.io
                        .to(usuario.socketId)
                        .emit('novo_chat', new SocketSend({ chat: c }));
                });

                await Promise.all(promises);
            }
        }

        return new SocketSend();
    }
}
