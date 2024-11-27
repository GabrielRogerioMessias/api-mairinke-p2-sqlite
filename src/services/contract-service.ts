import { Contract, ContractAtributes } from "../models/contract-model";
import { Profile } from "../models/profile-model";
import { ContractRepository } from "../repositories/contract-repositoy";
import { ProfileRespository } from "../repositories/profile-repository";

export class ContractService {
    private profileRepository: ProfileRespository;
    private contractRepository: ContractRepository;
    constructor() {
        this.profileRepository = new ProfileRespository();
        this.contractRepository = new ContractRepository();
    }

    public async insertContract(dataContract: ContractAtributes) {
        const profile: Profile = await this.profileRepository.findById(dataContract.clientId);
        dataContract.operationDate = new Date();
        dataContract.status = false;

        const contract: Contract = await this.contractRepository.insertContract(dataContract);
        return contract;
    }

    public async findAllJobsOfContracts(idContract: number) {
        const jobs = await this.contractRepository.findAllJobs(idContract);
        return jobs;
    }
}