export default abstract class Conta {
    private _numbanco: number = 0.0;
    private _numconta: number = 0.0;
    private _saque: number = 0.0;
    private _deposito: number = 0.0;
    private _saldo: number = 0.0;

    private _nome: string ="";
    private _cpf: string ="";
    private _endereco: string ="";
    private _email: string ="";

    //Getters and Setters

    public get numbanco(): number  {
        return this._numbanco;
    }

    
    public get numconta(): number  {
        return this._numconta;
    }

    
    public get saque(): number  {
        return this._saque;
    }

    
    public get deposito(): number  {
        return this._deposito;
    }

    
    public set numbanco(value: number ) {
        this._numbanco = value;
    }

    
    public set numconta(value: number ) {
        this._numconta = value;
    }

    
    public set saque(value: number ) {
        this._saque = value;
    }

    
    public set deposito(value: number ) {
        this._deposito = value;
    }

    // public set saldo(value: number ) {
    //     this._saldo = value;
    // }

    public get saldos(): number {
        return this._saldo;
    }
    public set saldos(value: number) {
        this._saldo = value;
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

    
    /**
     * Setter nome
     * @param {string} value
     */
    public set nome(value: string) {
        this._nome = value;
    }

    /**
     * Setter endereco
     * @param {string} value
     */
    public set endereco(value: string) {
        this._endereco = value;
    }

    /**
     * Setter cpf
     * @param {string} value
     */
    public set cpf(value: string) {
        this._cpf = value;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }
}