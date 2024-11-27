
import { JobController } from "../controllers/job-controller";
import { Router } from "express";

const jobRouter = Router();
const jobController = new JobController();

jobRouter.post('/jobs', (req, resp) => jobController.insertJob(req, resp));
jobRouter.get('/jobs/total-not-paid', (req, resp) => jobController.totalJobsNotPaid(req, resp));
jobRouter.get('/jobs/not-paid', (req, resp) => jobController.jobsNotPaid(req, resp));

export default jobRouter;