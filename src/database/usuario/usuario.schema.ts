import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({
    timestamps: true,
})
export class Usuario {
    @Prop({ required: true })
    primeiroNome: string;

    @Prop({ required: true })
    nomeCompleto: string;

    @Prop({
        default:
            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    })
    foto: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    senha: string;

    @Prop({ default: false })
    administrador: boolean;

    @Prop({ default: 1, isInteger: true, enum: [1, 2] }) // 1- ativo, 2- inativo
    situacao: number;

    @Prop({ default: 1, isInteger: true, enum: [1, 2, 3] }) // 1-online, 2- ausente, 3-desconectado
    statusChat: number;

    @Prop({ default: null, unique: true })
    socketId: string | null;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
