import { ChatService } from '@/database/chat/chat.service';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { Socket } from '@/websocket/common/types/Socket';
import { SocketSend } from '@/websocket/common/types/SocketSend';
import {
    ConnectedSocket,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DisconnectGateway {
    constructor(private usuario: UsuarioService, private chat: ChatService) {}

    @WebSocketServer()
    io: Server;

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log(`client disconnect ${socket.id}`);

        if (socket.data.usuario) {
            await this.usuario.atualizar(socket.data.usuario._id, {
                socketId: null,
            });

            const chats = await this.chat.buscarTodos({
                usuarioResponsavel: {
                    $in: socket.data.usuario._id,
                },
                situacao: 2,
            });

            this.io.to(chats.map((c) => c.uid)).emit(
                'usuario_status',
                new SocketSend({
                    usuario: {
                        statusChat: 3,
                        socketId: null,
                    },
                }),
            );

            return;
        }

        if (socket.data.chat) {
            const chat = await this.chat.buscarId(socket.data.chat._id);

            if (!chat || chat.situacao === 3) return;

            chat.socketId = null;
            await chat.save();

            let tentativas = 1;

            // intervalo para reconexao do socket
            const interval = setInterval(async () => {
                console.log(`Chat: ${chat._id} - Tentativa: ${tentativas}`);

                const chatUpdate = await this.chat.buscarId(
                    chat._id.toHexString(),
                );

                if (!chat || chatUpdate?.socketId !== null)
                    return clearInterval(interval);

                if (tentativas === 3 && chatUpdate.socketId === null) {
                    chat.socketId = null;
                    chat.dataFim = new Date();
                    chat.situacao = 3;
                    chat.usuarioFila = null;

                    await chat.save();

                    if (chatUpdate.situacao === 1 && chatUpdate.usuarioFila) {
                        const usuario = await this.usuario.buscarId(
                            chatUpdate.usuarioFila.toString(),
                        );

                        socket.to(usuario.socketId).emit(
                            'chat_status',
                            new SocketSend({
                                chat,
                            }),
                        );
                    } else {
                        socket.to(chat.uid).emit(
                            'chat_status',
                            new SocketSend({
                                chat,
                            }),
                        );
                    }

                    return clearInterval(interval);
                }

                tentativas = tentativas + 1;
            }, 10000);

            if (chat.situacao === 1 && chat.usuarioFila) {
                const usuario = await this.usuario.buscarId(
                    chat.usuarioFila.toString(),
                );

                socket.to(usuario.socketId).emit(
                    'chat_status',
                    new SocketSend({
                        chat,
                    }),
                );
            } else {
                socket.to(chat.uid).emit(
                    'chat_status',
                    new SocketSend({
                        chat,
                    }),
                );
            }

            if (!chat) return;

            return;
        }

        return;
    }
}
