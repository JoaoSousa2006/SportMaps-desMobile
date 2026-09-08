export default interface IConta {

    depositar(valor: number): number;
    sacar(valor: number): number;
    saldos(): number;

}

export interface ICliente {
    _nome: string;
    _endereco: string;
    _cpf: string;
    _email: string;
}

export interface IAbrir {
    abrirconta(cli: ICliente): void
}
