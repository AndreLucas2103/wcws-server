import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { Usuario, UsuarioDocument } from './usuario.schema';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario.name)
        private readonly usuario: Model<UsuarioDocument>,
    ) {}

    async buscarTodos(
        condicao?: FilterQuery<UsuarioDocument>,
    ): Promise<Usuario[]> {
        return await this.usuario.find(condicao);
    }

    async buscarId(_id: string): Promise<Usuario> {
        return await this.usuario.findById(_id);
    }

    async buscarSocketId(socketId: string): Promise<UsuarioDocument> {
        return await this.usuario.findOne({
            socketId,
        });
    }

    async buscar(
        condicao?: FilterQuery<UsuarioDocument>,
        opcao?: {
            selectSenha?: boolean;
        },
    ): Promise<UsuarioDocument> {
        return await this.usuario
            .findOne(condicao)
            .select(opcao.selectSenha ? '+senha' : '');
    }

    async criar(data: CriarUsuarioDto): Promise<UsuarioDocument> {
        return await this.usuario.create(data);
    }

    async atualizar(_id: string, data: Partial<Usuario>) {
        return await this.usuario.updateOne({ _id }, data);
    }

    async deletar(_id: string) {
        return await this.usuario.deleteOne({ _id });
    }
}
