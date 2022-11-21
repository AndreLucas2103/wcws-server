import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SocketAdapter } from './websocket/websocket.adapter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('events').EventEmitter.defaultMaxListeners = 1000; // verificar se isso realmente está certo, pois pode ocorrer gargalos

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory(errors) {
                console.log(errors);
            },
        }),
    );

    app.useWebSocketAdapter(new SocketAdapter(app));

    await app.listen(process.env.PORT || 3030);
}
bootstrap();
