import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CriarMensagemDto } from './dtos/criar-mensagem.dto';
import { Mensagem, MensagemDocument } from './mensagem.schema';

@Injectable()
export class MensagemService {
    constructor(
        @InjectModel(Mensagem.name)
        private readonly mensagem: Model<MensagemDocument>,
    ) {}

    async buscarTodos(condicao?: FilterQuery<MensagemDocument>) {
        return await this.mensagem.find(condicao);
    }

    async criar(data: CriarMensagemDto) {
        return await this.mensagem.create({
            mensagem: data.mensagem,
            chat: data.idChat,
            usuario: data.idUsuario,
        });
    }

    async buscarId(_id: string) {
        return await this.mensagem.findById(_id);
    }

    async buscar(condicao: FilterQuery<MensagemDocument>) {
        return await this.mensagem.findOne(condicao);
    }

    async atualizar(_id: string, data: Partial<Mensagem>) {
        return await this.mensagem.updateOne({ _id }, data);
    }

    async deletar(_id: string) {
        return await this.mensagem.deleteOne({ _id });
    }
}
