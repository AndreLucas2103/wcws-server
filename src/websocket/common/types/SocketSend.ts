export class SocketSend {
    public readonly data: object | object[];

    constructor(data?: object | object[]) {
        this.data = data || {};
    }
}

export class CallbackError {
    public readonly erro: {
        mensagem: string;
        codigo: string;
        detalhe: string;
    };

    constructor(mensagem = '', codigo = '500', detalhe = '') {
        this.erro = {
            mensagem,
            codigo,
            detalhe,
        };
    }
}
