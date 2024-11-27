import { Job, JobAtributes } from "../models/job-model";

export class JobRepository {

    public async insertJob(dataJob: JobAtributes) {
        const newJob = await Job.create(dataJob);
        return newJob;
    }
    public async findById(idJob: number) {
        const jobResult = await Job.findByPk(idJob);
        if (!jobResult) {
            throw new Error(`Job not found with id:${idJob}`)
        }
        return jobResult;
    }

    public async jobsNotPaid() {
        const jobs = await Job.findAll({ where: { paid: false } });
        return jobs;
    }

}