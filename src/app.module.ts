import { Module } from '@nestjs/common';
import { WebsocketsModule } from './websocket/websocket.module';
import { RunningModule } from './api/running/running.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/usuario.schema';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/test',
            {
                dbName: 'as',
            },
        ),
        WebsocketsModule,
        RunningModule,
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ],
})
export class AppModule {}
