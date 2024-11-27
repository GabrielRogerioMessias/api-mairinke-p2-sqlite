import express, { Request, Response } from 'express'
import request from 'supertest'
import { DepositControler } from '../controllers/deposit-controller'
import { DepositService } from '../services/deposit-service'
import { json } from 'sequelize'
jest.mock("../services/deposit-service.ts")
const mockInsertDeposit = jest.fn();
DepositService.prototype.insertDeposit = mockInsertDeposit;
const depositController = new DepositControler();

const app = express();
app.use(express.json());

app.post("/deposits", (req: Request, resp: Response) => depositController.insertDeposit(req, resp))

describe("Deposit Controller", () => {
    test("When an deposit was successfully", async () => {
        const mockDepositData = { clientId: 1, operationDate: "2024-10-07", depositValue: 150 };
        mockInsertDeposit.mockResolvedValue(mockDepositData);
        const response = await request(app)
            .post("/deposits")
            .send(mockDepositData);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockDepositData);
        expect(mockInsertDeposit).toHaveBeenCalledTimes(1);
    })

    test('When an deposit was not successfully', async () => {
        const mockDepositDataTwo = { clientId: 1, operationDate: "2024-10-07", depositValue: -15 };
        mockInsertDeposit.mockRejectedValue(new Error('O valor do déposito deve ser maior que 0'))
        const response = await request(app)
            .post('/deposits')
            .send(mockDepositDataTwo);
        expect(response.status).toBe(500);
        expect(mockInsertDeposit).toHaveBeenCalledTimes(2);
        expect(response.body).toHaveProperty('error', "O valor do déposito deve ser maior que 0")
    })
})