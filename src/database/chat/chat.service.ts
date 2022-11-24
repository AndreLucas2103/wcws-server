import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CriarChatDto } from './dtos/criar-chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private readonly chat: Model<ChatDocument>,
    ) {}

    async buscarId(_id: string) {
        return this.chat.findById(_id);
    }

    async buscar(condicao: FilterQuery<ChatDocument>): Promise<Chat> {
        return this.chat.findOne(condicao);
    }

    async criar(data: CriarChatDto): Promise<Chat> {
        return this.chat.create(data);
    }

    async atualizar(_id: string, data: Partial<Chat>) {
        return this.chat.updateOne({ _id }, data);
    }

    async deletar(_id: string) {
        this.chat.deleteOne({ _id });
    }
}
