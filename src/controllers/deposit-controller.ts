import { DepositAtributes } from '@models/deposit-model';
import { DepositService } from '../services/deposit-service'
import express, { Request, Response } from 'express'
export class DepositControler {
    private depositService: DepositService;
    constructor() {
        this.depositService = new DepositService();
    }


    public async insertDeposit(req: Request, resp: Response): Promise<Response> {

        try {
            const { clientId, operationDate, depositValue } = req.body;
            if (!clientId || !operationDate || !depositValue === undefined) {
                return resp.status(400).json({ 'message': 'Missing required fields' })
            }
            const newDeposit: DepositAtributes = { clientId, operationDate, depositValue };
            const deposit = await this.depositService.insertDeposit(newDeposit);
            return resp.status(201).json(deposit);
        } catch (error) {
            return resp.status(500).json({
                message: 'Error ao realizar o deposito',
                error: (error as Error).message,
            });
        }
    }
}

