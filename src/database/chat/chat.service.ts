import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CriarChatDto } from './dtos/criar-chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private readonly chat: Model<ChatDocument>,
    ) {}

    async buscarId(_id: string, opcoes?: QueryOptions<ChatDocument>) {
        return await this.chat.findById(_id, opcoes);
    }

    async buscar(condicao: FilterQuery<ChatDocument>) {
        return await this.chat.findOne(condicao);
    }

    async buscarTodos(condicao?: FilterQuery<ChatDocument>) {
        return await this.chat.find(condicao);
    }

    async criar(data: CriarChatDto): Promise<ChatDocument> {
        return await this.chat.create(data);
    }

    async atualizar(_id: string, data: Partial<Chat>) {
        return await this.chat.updateOne({ _id }, data);
    }

    async deletar(_id: string) {
        await this.chat.deleteOne({ _id });
    }
}
