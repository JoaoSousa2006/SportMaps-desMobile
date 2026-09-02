import Conta from './Conta'
import IContas, {IAbrir, ICliente} from './IConta';

export default class Salario extends Conta implements IContas{
    
    abrirconta(cli:ICliente): void{
        throw new Error('Method not implemented.')
    }
    depositar(valor: number): number {
        throw new Error('Method not implemented.')
    }
    sacar(valor: number): number {
        throw new Error('Method not implemented.')
    }
    saldos(valor: number): number {
        throw new Error('Method not implemented.')
    }

}