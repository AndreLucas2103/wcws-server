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

    async buscarTodos(condicao?: FilterQuery<UsuarioDocument>) {
        return await this.usuario.find(condicao);
    }

    async buscarId(_id: string) {
        return await this.usuario.findById(_id);
    }

    async buscarSocketId(socketId: string) {
        return await this.usuario.findOne({
            socketId,
        });
    }

    async buscar(
        condicao?: FilterQuery<UsuarioDocument>,
        opcao?: {
            selectSenha?: boolean;
        },
    ) {
        return await this.usuario
            .findOne(condicao)
            .select(opcao?.selectSenha ? '+senha' : '');
    }

    async criar(data: CriarUsuarioDto) {
        return await this.usuario.create(data);
    }

    async atualizar(_id: string, data: Partial<Usuario>) {
        return await this.usuario.updateOne({ _id }, data);
    }

    async deletar(_id: string) {
        return await this.usuario.deleteOne({ _id });
    }

    async proximoUsuarioFila(): Promise<
        | (UsuarioDocument & {
              qtdChatResponsavel: number;
              qtdChatFila: number;
          })
        | null
    > {
        const usuarios: (UsuarioDocument & {
            qtdChatResponsavel: number;
            qtdChatFila: number;
        })[] = await this.usuario.aggregate([
            {
                $match: {
                    $and: [{ statusChat: 1 }],
                },
            },
            {
                $lookup: {
                    from: 'chats',
                    foreignField: 'usuarioResponsavel',
                    localField: '_id',
                    as: 'usuarioResponsavel',
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    {
                                        situacao: 2,
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'chats',
                    foreignField: 'usuarioFila',
                    localField: '_id',
                    as: 'usuarioFila',
                },
            },
            {
                // realizar contagem dos campos
                $addFields: {
                    qtdChatResponsavel: { $size: '$usuarioResponsavel' },
                    qtdChatFila: { $size: '$usuarioFila' },
                },
            },
            // remover campos desnecessarios
            { $unset: ['senha', 'usuarioResponsavel', 'usuarioFila'] },
        ]);

        if (usuarios.length === 0) return null;
        if (usuarios.length === 1) return usuarios[0];

        // pega o menor numero de atendimentos em adamento dos usuarios online
        const menorNumeroResponsavel = Math.min(
            ...usuarios.map((u) => u.qtdChatResponsavel),
        );

        // filtra todos os usuarios que possuem o menor numero
        const usuariosMenorNumeroResponsavel = usuarios.filter(
            (u) => u.qtdChatResponsavel === menorNumeroResponsavel,
        );

        // se tiver somente um com menor numero de atendimetno em andamento, vai para ele
        if (usuariosMenorNumeroResponsavel.length === 1)
            return usuariosMenorNumeroResponsavel[0];

        // caso tiver mais de um usuario com o mesmo valor de menor quantidade de atendimento
        // valido a quantidade de chats que está na fila
        const menorNumeroFila = Math.min(
            ...usuariosMenorNumeroResponsavel.map((u) => u.qtdChatFila),
        );

        // filtra por todos que tem o menor numero na fila
        const usuariosMenorNumeroFila = usuariosMenorNumeroResponsavel.filter(
            (u) => u.qtdChatFila === menorNumeroFila,
        );

        // se tiver somente um já vai para ele
        if (usuariosMenorNumeroFila.length === 1)
            return usuariosMenorNumeroFila[0];

        // se tiver mais de um, é selecionado um aleatorio
        const usuario =
            usuariosMenorNumeroFila[
                Math.floor(Math.random() * usuariosMenorNumeroFila.length)
            ];

        return usuario;
    }
}
