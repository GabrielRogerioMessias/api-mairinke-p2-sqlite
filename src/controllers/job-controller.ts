import { Job, JobAtributes } from "../models/job-model";
import { JobService } from "../services/job-service";
import express, { Response, Request } from 'express';

export class JobController {
    private jobService: JobService;
    constructor() {
        this.jobService = new JobService();
    }

    public async jobsNotPaid(req: Request, resp: Response): Promise<Response> {
        try {
            const jobs: Job[] = await this.jobService.jobsNotPaid();
            return resp.status(200).json(jobs)
        } catch (error) {
            return resp.status(500).json({
                message: 'Error ao retornar a lista de trabalhos',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });
        }
    }

    public async totalJobsNotPaid(req: Request, resp: Response): Promise<Response> {
        try {
            const totalJobsNotPaidValue = await this.jobService.totalJobsNotPaid();
            return resp.status(200).json(totalJobsNotPaidValue)
        } catch (error) {
            return resp.status(500).json({
                message: 'Erro ao retornar o valor total de trabalhos não pagos',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });

        }
    }

    public async insertJob(req: Request, resp: Response): Promise<Response> {
        try {
            const { description, operationDate, contractId, paymentDate, price, paid } = req.body;
            if (!contractId || !description || !price || !paid === undefined) {
                return resp.status(400).json({ 'message': 'Missing required fields' })
            }
            const newJob: JobAtributes = { description, operationDate, contractId, paymentDate, paid, price };
            const createdJob = await this.jobService.insertJob(newJob);
            return resp.status(201).json(createdJob);
        } catch (error) {
            return resp.status(500).json({
                message: 'Erro ao criar o contrato',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });
        }
    }
}