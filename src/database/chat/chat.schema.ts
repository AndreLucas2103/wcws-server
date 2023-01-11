import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from '../usuario/usuario.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    timestamps: true,
})
export class Chat {
    @Prop({
        type: String,
        default: uuidv4,
    })
    uid: string;

    @Prop({ type: String, required: true })
    nome: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, default: null })
    socketId: string | null;

    @Prop({ type: Number, default: 1, enum: [1, 2, 3, 4] }) // 1- aguardando, 2- andamento, 3-finalizado, 4-em tranferência
    situacao: number;

    @Prop({ type: Date, default: now() })
    dataInicio: Date;

    @Prop({ type: Date, default: null })
    dataFim: Date | null;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
    usuarioResponsavel: Usuario[] | string[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null,
    })
    usuarioFila: Usuario | null | string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
