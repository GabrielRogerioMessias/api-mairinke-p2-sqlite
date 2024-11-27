import { ProfileRespository } from "../repositories/profile-repository";
import { Deposit, DepositAtributes } from "../models/deposit-model";
import { DepositRepository } from "../repositories/deposit-repository";
import { Profile } from "../models/profile-model";
export class DepositService {
    private deposositRepository: DepositRepository;
    private profileRepository: ProfileRespository;
    constructor() {
        this.profileRepository = new ProfileRespository();
        this.deposositRepository = new DepositRepository();
    }
    public async insertDeposit(dataDeposit: DepositAtributes) {
        const profile: Profile = await this.profileRepository.findById(dataDeposit.clientId);
        if (dataDeposit.depositValue <= 0) {
            throw new Error('O valor do déposito deve ser maior que 0')
        }
        const deposit = this.deposositRepository.insertDeposit(dataDeposit);
        profile.balance = profile.balance + dataDeposit.depositValue;
        await profile.save();
        return deposit;
    }

    public async getAllDeposits() {
        const deposits: DepositAtributes[] = await this.deposositRepository.getlAllDeposits();
        return deposits;
    }
}