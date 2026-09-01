export default abstract class Conta {
        private _numbanco: number = 0.0;
        private _numconta: number = 0.0;
        private _saque: number = 0.0;
        private _deposito: number = 0.0;
        private _saldos: number = 0.0;
    //Getters and Setters
    /**
     * Getter numbanco
     * @return {number }
     */
	public get numbanco(): number  {
		return this._numbanco;
	}

    /**
     * Getter numconta
     * @return {number }
     */
	public get numconta(): number  {
		return this._numconta;
	}

    /**
     * Getter saque
     * @return {number }
     */
	public get saque(): number  {
		return this._saque;
	}

    /**
     * Getter deposito
     * @return {number }
     */
	public get deposito(): number  {
		return this._deposito;
	}

    /**
     * Getter saldo
     * @return {number }
     */
	public get saldo(): number  {
		return this._saldo;
	}

    /**
     * Setter numbanco
     * @param {number } value
     */
	public set numbanco(value: number ) {
		this._numbanco = value;
	}

    /**
     * Setter numconta
     * @param {number } value
     */
	public set numconta(value: number ) {
		this._numconta = value;
	}

    /**
     * Setter saque
     * @param {number } value
     */
	public set saque(value: number ) {
		this._saque = value;
	}

    /**
     * Setter deposito
     * @param {number } value
     */
	public set deposito(value: number ) {
		this._deposito = value;
	}

    /**
     * Setter saldo
     * @param {number } value
     */
	public set saldo(value: number ) {
		this._saldo = value;
	}
    

    }