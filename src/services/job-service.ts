import { ContractRepository } from "../repositories/contract-repositoy";
import { JobAtributes } from "../models/job-model";
import { JobRepository } from "../repositories/job-repository";
import { Contract } from "../models/contract-model";

export class JobService {
    private jobRepository: JobRepository;
    private contractRepository: ContractRepository;
    constructor() {
        this.jobRepository = new JobRepository();
        this.contractRepository = new ContractRepository();
    }

    public async insertJob(dataJob: JobAtributes) {
        if (dataJob.price < 0) {
            throw new Error('O valor do trabalho deve ser maior do que zero')
        }
        const contract: Contract = await this.contractRepository.findById(dataJob.contractId);
        dataJob.operationDate = new Date()
        dataJob.paymentDate = new Date();
        dataJob.paid = false;
        contract.save();
        return await this.jobRepository.insertJob(dataJob);
    }

    public async jobsNotPaid() {
        const jobs = await this.jobRepository.jobsNotPaid();
        return jobs;
    }

    public async totalJobsNotPaid() {
        const jobs = await this.jobRepository.jobsNotPaid();
        const pendingValue = jobs.reduce((total, jobs) => {
            return total + jobs.price;
        }, 0)
        return pendingValue;
    }

}