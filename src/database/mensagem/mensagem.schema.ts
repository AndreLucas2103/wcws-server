import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { Chat } from '../chat/chat.schema';
import { Usuario } from '../usuario/usuario.schema';

export type MensagemDocument = HydratedDocument<Mensagem>;

@Schema({
    timestamps: true,
    collection: 'mensagens',
})
export class Mensagem {
    @Prop({ type: String, required: true })
    mensagem: string;

    @Prop({
        type: Date,
        default: now,
    })
    data: Date;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    })
    chat: Chat;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null,
    })
    usuario: Usuario | null;

    @Prop({
        type: Boolean,
        default: false,
    })
    bot: boolean;
}

export const MensagemSchema = SchemaFactory.createForClass(Mensagem);
