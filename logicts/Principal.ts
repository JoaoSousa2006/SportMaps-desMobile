import Corrente from "./Corrente";
import Poupanca from "./Poupanca";
import Salario from "./Salario";

class Principal {
    
    teste: string = "";
    
    main(): void{
        const ccore = new Corrente();
        const cpoupe = new Poupanca();
        const cs = new Salario();
        
        cs.saldo = 50.0;

       cpouipe.depositar(cs.saldo);

        ccore.saldo = 30.4;
        
        cs.depositar(250.13);

        console.log("Depositar após depósito: " + cs.saldos())

        cs.sacar(43.21);

        console.log("Valor após saque: " + cs.saldos())


    }
}

const app = new Principal();
app.main();
