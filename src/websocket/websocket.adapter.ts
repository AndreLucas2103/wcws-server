import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        },
    ) {
        const server: Server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: '*',
            },
            transports: ['websocket'],
            pingInterval: 1000,
            pingTimeout: 1000,
        } as ServerOptions);

        // socket admin ui, ana

        instrument(server, {
            auth: false,
        });

        return server;
    }
}
