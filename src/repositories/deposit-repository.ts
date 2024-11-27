import { DepositAtributes, Deposit } from "../models/deposit-model";
export class DepositRepository {

    public async insertDeposit(dataDeposity: DepositAtributes) {
        return await Deposit.create(dataDeposity);
    }

    public async getlAllDeposits() {
        return await Deposit.findAll();
    }
}