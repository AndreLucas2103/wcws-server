export class AppResponse {
    public readonly pagina?: number;

    public readonly limite?: number;

    public readonly count?: number;

    public readonly data?: any;

    constructor(
        data: any,
        pagina = undefined,
        limite = undefined,
        count = undefined,
    ) {
        this.data = data;
        this.pagina = pagina;
        this.limite = limite;
        this.count = count;
    }
}
