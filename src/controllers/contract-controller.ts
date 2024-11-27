import { ContractAtributes } from "@models/contract-model";
import { ContractService } from "../services/contract-service";
import express, { Request, Response } from "express";

export class ContractController {
    private contractService: ContractService;
    constructor() {
        this.contractService = new ContractService();
    }

    public async insertContract(req: Request, resp: Response): Promise<Response> {
        try {
            const { terms, clientId, operationDate, status } = req.body;
            if (!terms || !clientId) {
                return resp.status(400).json({ 'message': 'Missing required fields' })
            }

            const newContract: ContractAtributes = { terms, clientId, operationDate, status };
            const createdContract = await this.contractService.insertContract(newContract);
            return resp.status(201).json(createdContract);
        } catch (error) {
            return resp.status(500).json({
                message: 'Erro ao criar o contrato',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });

        }
    }

    public async findAllJobsOfContracts(req: Request, resp: Response): Promise<Response> {
        try {
            const { idContract } = req.params;
            const allJobs = await this.contractService.findAllJobsOfContracts(parseInt(idContract));
            return resp.status(200).json(allJobs);
        } catch (error) {
            return resp.status(500).json({
                message: 'Error ao retornar a lista de trabalhos',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });
        }
    }
}