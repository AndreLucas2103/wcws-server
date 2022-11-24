import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { UsePipes } from '@nestjs/common';
import { WSValidationPipe } from '../../../common/ws-validation.pipe';
import { Socket } from 'socket.io';
import { LoginDto } from '../dtos/login.dto';
import { UsuarioService } from '@/database/usuario/usuario.service';

@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class AuthLoginGateway {
    constructor(private usuario: UsuarioService) {}

    @SubscribeMessage('auth-login')
    async handleEvent(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: LoginDto,
    ) {
        console.log(await this.usuario.buscarTodos());
    }
}
