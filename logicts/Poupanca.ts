import Conta from './Conta';
import IContas from './IConta';

export default class Poupanca extends Conta implements IContas {
    
    depositar(valor: number): number {
        this.saldo += valor;
        return this.saldo;
    }
    
    sacar(valor: number): number {
        this.saldo -= valor;
        return valor;
    }
    saldos(): number {
        return this.saldo;
    }

}
