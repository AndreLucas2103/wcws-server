import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsException,
    WsResponse,
} from '@nestjs/websockets';
import { UsePipes } from '@nestjs/common';
import { MessageDto } from '../../dtos/Teste.dto';
import { WSValidationPipe } from '../../../../../common/WSValidation.pipe';

@UsePipes(new WSValidationPipe())
@WebSocketGateway()
export class TesteGateway {
    @SubscribeMessage('teste')
    handleEvent(@MessageBody() data: MessageDto): WsResponse<unknown> {
        const event = 'events';

        console.log(data);
        return { event, data };
    }
}
