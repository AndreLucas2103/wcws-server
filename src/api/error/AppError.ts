export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    public readonly codPermissao?: string;

    public readonly detalhe?: string;

    constructor(
        message: string,
        statusCode = 400,
        codPermissao = undefined,
        detalhe = undefined,
    ) {
        this.message = message;
        this.statusCode = statusCode;
        this.codPermissao = codPermissao;
        this.detalhe = detalhe;
    }
}
