import { Payment, PaymentAtributes } from "../models/payment-model";

export class PaymentRepository {

    public async insertPayment(dataPayment: PaymentAtributes) {
        const payment: PaymentAtributes = await Payment.create(dataPayment);
        return payment;
    }

    public async findByJobId(jobId: number) {
        const payments = await Payment.findAll({ where: { jobId } })
        return payments;
    }
}