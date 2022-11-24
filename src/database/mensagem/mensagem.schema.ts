import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { Chat } from '../chat/chat.schema';
import { Usuario } from '../usuario/usuario.schema';

export type MensagemDocument = HydratedDocument<Mensagem>;

@Schema({
    timestamps: true,
})
export class Mensagem {
    @Prop({ required: true })
    mensagem: string;

    @Prop({
        required: true,
        default: now(),
    })
    data: Date;

    @Prop({
        required: true,
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    })
    chat: Chat;

    usuario: Usuario | null;
}

export const MensagemSchema = SchemaFactory.createForClass(Mensagem);
