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
        default: uuidv4(),
    })
    uuid: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    email: string;

    @Prop({ default: null, unique: true })
    socketId: string | null;

    @Prop({ default: 1, enum: [1, 2, 3] }) // 1- aguardando, 2- andamento, 3-finalizado, 4-em tranferência
    situacao: number;

    @Prop({ default: now() })
    dataInicio: Date;

    @Prop({ default: null })
    dataFim: Date | null;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
    usuarioResponsavel: Usuario[];

    @Prop({
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    })
    usuarioFIla: Usuario | null;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
