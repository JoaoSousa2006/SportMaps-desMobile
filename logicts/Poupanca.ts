import Conta from './Conta';
import IContas, {IAbrir, ICliente} from './IConta';


export default class Poupanca extends Conta implements IContas {
    depositar(valor: number): number {
        throw new Error('Method not implemented.');
    }
    sacar(valor: number): number {
        throw new Error('Method not implemented.');
    }
    saldos(): number {
        throw new Error('Method not implemented.');
    }

}