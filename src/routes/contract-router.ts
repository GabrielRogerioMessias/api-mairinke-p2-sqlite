import { ContractController } from "../controllers/contract-controller";
import { Router } from "express";

const contractRouter = Router();
const contractController = new ContractController();

contractRouter.post('/contracts', (req, resp) => contractController.insertContract(req, resp));
contractRouter.get('/contracts/jobs/:idContract', (req, resp) => contractController.findAllJobsOfContracts(req, resp));

export default contractRouter;