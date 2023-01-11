import { Socket as SocketIO } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type Socket = SocketIO<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    {
        usuario?: {
            _id: string;
            administrador: boolean;
        };
        chat?: {
            _id: string;
        };
    }
>;
