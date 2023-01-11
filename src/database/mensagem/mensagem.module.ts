import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mensagem, MensagemSchema } from './mensagem.schema';
import { MensagemService } from './mensagem.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Mensagem.name, schema: MensagemSchema },
        ]),
    ],
    providers: [MensagemService],
    exports: [MensagemService],
})
export class MensagemModule {}
