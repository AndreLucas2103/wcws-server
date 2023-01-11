import { authToken } from '@/common/config/authToken';
import { ChatService } from '@/database/chat/chat.service';
import { UsuarioService } from '@/database/usuario/usuario.service';
import { Socket } from '@/websocket/common/types/Socket';
import { SocketSend } from '@/websocket/common/types/SocketSend';
import { WebSocketGateway, WsException } from '@nestjs/websockets';

import * as jwt from 'jsonwebtoken';

// decodificar o jwt
function jwtDecoded(token: string) {
    const jwtDecoded: any = jwt.verify(
        token,
        authToken.secret,
        (err: any, decoded: any) => {
            // verifica se o token é valido
            if (err) {
                throw new WsException('Token inválido');
            }

            if (Date.now() > decoded.exp * 1000)
                throw new WsException('Token inválido');

            // exp = expire, in = data criacao, id
            return decoded;
        },
    );

    return jwtDecoded as {
        idUsuario?: string;
        isUsuario: boolean;
        idChat?: string;
        iat: number;
        exp: number;
    };
}

@WebSocketGateway()
export class ConnectionGateway {
    constructor(private usuario: UsuarioService, private chat: ChatService) {}

    async handleConnection(socket: Socket) {
        console.log(`client connecter ${socket.id}`);

        // caso não tenha token, provavelmente seja visitante (client)
        if (!socket.handshake.auth.token) return;

        const tokenDecoded = jwtDecoded(socket.handshake.auth.token);

        if (tokenDecoded.isUsuario) {
            const usuario = await this.usuario.buscarId(tokenDecoded.idUsuario);

            // atualiza o novo socket.id gerado
            await this.usuario.atualizar(usuario._id.toString(), {
                socketId: socket.id,
            });

            const chatsAndamento = await this.chat.buscarTodos({
                situacao: 2,
                usuarioResponsavel: { $in: usuario._id },
            });

            // entra o usuario em todas as salas que ele fazia parte
            socket.join(chatsAndamento.map((c) => c.uid));

            socket.data.usuario = {
                _id: usuario._id.toString(),
                administrador: usuario.administrador,
            };

            return;
        } else {
            const chat = await this.chat.buscarId(tokenDecoded.idChat);

            if (!chat) return;

            if (chat.situacao === 3) {
                socket.disconnect();

                return;
            }

            chat.socketId = socket.id;

            await chat.save();

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

            socket.join(chat.uid);

            socket.data.chat = {
                _id: chat._id.toString(),
            };
        }
    }
}
