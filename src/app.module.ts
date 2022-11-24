import { Module } from '@nestjs/common';
import { WebsocketsModule } from './websocket/websocket.module';
import { RunningModule } from './api/running/running.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/test',
            {
                dbName: 'wcws',
            },
        ),
        WebsocketsModule,
        RunningModule,
    ],
})
export class AppModule {}
