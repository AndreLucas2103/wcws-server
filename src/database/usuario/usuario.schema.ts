import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({
    timestamps: true,
})
export class Usuario {
    @Prop({ type: String, required: true })
    primeiroNome: string;

    @Prop({ type: String, required: true })
    nomeCompleto: string;

    @Prop({
        type: String,
        default:
            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    })
    foto: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true, select: false })
    senha: string;

    @Prop({ type: Boolean, default: false })
    administrador: boolean;

    @Prop({ type: Number, default: 1, isInteger: true, enum: [1, 2] }) // 1- ativo, 2- inativo
    situacao: number;

    @Prop({ type: Number, default: 3, isInteger: true, enum: [1, 2, 3] }) // 1-online, 2- ausente, 3-desconectado
    statusChat: number;

    @Prop({ type: String, default: null })
    socketId: string | null;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
