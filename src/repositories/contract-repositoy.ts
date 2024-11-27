import { Job } from "../models/job-model";
import { Contract, ContractAtributes } from "../models/contract-model";

export class ContractRepository {

    public async insertContract(dataContract: ContractAtributes) {
        const contract: Contract = await Contract.create(dataContract);
        return contract;
    }

    public async findById(idContract: number) {
        const contract: Contract = await Contract.findByPk(idContract);
        if (!contract) {
            throw new Error(`Contract not found with id:${idContract}`)
        }
        return contract;
    }

    public async findAllJobs(contractId: number) {
        const jobs = await Job.findAll({
            where: { contractId }
        })
        return jobs;
    }

}