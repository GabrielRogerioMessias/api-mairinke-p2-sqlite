import { PaymentController } from "../controllers/payment-controller";
import { Router } from "express";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post('/payments', (req, resp) => paymentController.inserPayment(req, resp));

export default paymentRouter;