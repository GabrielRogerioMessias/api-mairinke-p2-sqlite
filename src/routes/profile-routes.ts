import { ProfileController } from "../controllers/profile-controller";
import { Router } from "express";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.post('/profiles', (req, resp) => profileController.createUser(req, resp));
profileRouter.get('/profiles', (req, resp) => profileController.getAllProfiles(req, resp));
profileRouter.get('/profiles/:id', (req, resp) => profileController.getBalanceById(req, resp))

export default profileRouter;