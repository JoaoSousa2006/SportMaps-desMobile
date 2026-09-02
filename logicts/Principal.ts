import Poupanca from "./Poupanca";
import Salario from "./Salario";

class Principal {
    teste: string = "";
    
    main(): void{
        const ccore = new Corrente();
        const cpoupe = new Poupanca();
        const cs = new Salario();
        
        cs.saldo = 50.0;

        cs.depositar(250.13);


        console.log("Depositar após depósito: " + cs.saldos())

        cs.sacar(43.21);

        console.log("Valor após saque: " + cs.saldos())


    }
}