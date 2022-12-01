import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './websocket/websocket.module';
import { RunningModule } from './api/modules/running/running.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
            dbName: 'wcws',
        }),
        WebsocketsModule,
        RunningModule,
        ApiModule,
    ],
})
export class AppModule {}
