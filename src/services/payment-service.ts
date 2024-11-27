import { PaymentRepository } from "../repositories/payment-repository";
import { Job, JobAtributes } from "../models/job-model";
import { PaymentAtributes } from "../models/payment-model";
import { JobRepository } from "../repositories/job-repository";

export class PaymentService {
    private paymentRepository: PaymentRepository;
    private jobRepository: JobRepository;
    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.jobRepository = new JobRepository();
    }
    public async insertPayment(dataPayment: PaymentAtributes) {
        dataPayment.operation = new Date();
        const job: Job = await this.jobRepository.findById(dataPayment.jobId);
        const paymentsPrevius = await this.paymentRepository.findByJobId(dataPayment.jobId);
        const totalPreviusPayments = paymentsPrevius.reduce((total, payment) => {
            return total + payment.paymentValue;
        }, 0)
        const pendente = job.price - totalPreviusPayments;
        if (totalPreviusPayments + dataPayment.paymentValue > job.price) {
            throw new Error(`O total de pagamentos é maior que o valor do serviço, valor pendene:${pendente} `)
        }
        if (totalPreviusPayments + dataPayment.paymentValue == job.price) {
            job.paymentDate = new Date();
            job.paid = true;
        }
        const payment: PaymentAtributes = await this.paymentRepository.insertPayment(dataPayment);
        job.save()
        return payment;
    }
}