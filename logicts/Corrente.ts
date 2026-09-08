import Conta from './Conta';
import IContas, {IAbrir, ICliente} from './IConta';

export default class Corrente extends Conta implements IContas, IAbrir{

    AbrirConta (cli: ICliente): void {
        this.nome = cli._nome;
        this.cpf = cli._cpf;
        this.endereco = cli._endereco;
        this.email = cli._email;
    }
	
    depositar (valor: number): number {
		
        this.saldo += valor;
        return this.saldos();
    }
	
    sacar (valor: number): number {
        this.saldo -= valor;
        return valor;
    }
	
    saldos (): number {
        return this.saldo;
    }

}
