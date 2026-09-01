import Conta from './Conta';
import IContas, {IAbrir, ICliente} from './IConta';

export default class Corrente extends Conta implements IContas, IAbrir{



    AbrirConta (cli: ICliente): void {
        this.nome = cli._nome;
        this._cpf = cli._cpf;
        this.endereco = cli._endereco;
        this.email = cli._email;
    }
    depositar (valor: number): number {
        this.deposito = valor;
        return history.saldos() + this.deposito;
    }
    sacar (valor: number): number {
        this.saque = valor;
        return this.saldos() - this.saque;
    }
    saldo (): number {
        throw new Error ('Method not implemented.');
    }


    //Getters and Setters
    
    /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Getter endereco
     * @return {string}
     */
	public get endereco(): string {
		return this._endereco;
	}

    /**
     * Getter cpf
     * @return {string}
     */
	public get cpf(): string {
		return this._cpf;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    private _nome: string;
    /**
     * Setter nome
     * @param {string} value
     */
	public set nome(value: string) {
		this._nome = value;
	}

    private _endereco: string;
    /**
     * Setter endereco
     * @param {string} value
     */
	public set endereco(value: string) {
		this._endereco = value;
	}

    private _cpf: string;
    /**
     * Setter cpf
     * @param {string} value
     */
	public set cpf(value: string) {
		this._cpf = value;
	}

    private _email: string;
    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

}