import request from 'supertest'
import express, { Request, Response } from 'express'
import { ProfileController } from '../controllers/profile-controller'
import { ProfileService } from '../services/profile-service'

jest.mock("../services/profile-service.ts")
const mockInsertDeposit = jest.fn();
ProfileService.prototype.createProfile = mockInsertDeposit;
const profileController = new ProfileController();

const app = express();
app.use(express.json());

app.post('/profiles', (req, resp) => profileController.createUser(req, resp));

describe('Profile Controller', () => {
    test('When an profile was successfully created', async () => {
        const dataMock = { firstName: "Teste", profession: "Test", balance: 150, type: "Test" }
        mockInsertDeposit.mockResolvedValue(dataMock);
        const response = await request(app)
            .post("/profiles")
            .send(dataMock);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(dataMock);
    })

    test('When an profile was not successfullt created', async () => {
        const dataMock = { firstName: "Teste", profession: "", balance: 150, type: "" }
        mockInsertDeposit.mockRejectedValue(new Error("Missing required fields"))
        const response = await request(app).post("/profiles");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Missing required fields")
    })
})