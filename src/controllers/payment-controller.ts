
import { PaymentAtributes } from "../models/payment-model";
import { PaymentService } from "../services/payment-service";
import express, { Response, Request } from 'express'
export class PaymentController {
    private paymentService: PaymentService;
    constructor() {
        this.paymentService = new PaymentService();
    }

    public async inserPayment(req: Request, resp: Response): Promise<Response> {
        try {
            const { jobId, operation, paymentValue } = req.body;
            if (!jobId || !paymentValue === undefined) {
                return resp.status(400).json({ message: 'Missing required fields' })
            }
            const newPayment: PaymentAtributes = { jobId, operation, paymentValue };
            const createdPayment: PaymentAtributes = await this.paymentService.insertPayment(newPayment);
            return resp.status(201).json(createdPayment);
        } catch (error) {
            return resp.status(500).json({
                message: 'Erro ao adicionar pagamento para o trabalho',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });
        }

    }
}