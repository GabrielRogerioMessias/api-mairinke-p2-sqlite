import { DepositControler } from "../controllers/deposit-controller";
import { Router } from "express";

const depositRouter = Router()
const depositControler = new DepositControler();

depositRouter.post('/deposits', (req, resp) => depositControler.insertDeposit(req, resp))


export default depositRouter;
