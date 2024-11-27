import request from "supertest";
import express, { Request, Response } from "express";
import { ContractController } from "../controllers/contract-controller";
import { ContractService } from "../services/contract-service";

jest.mock("../services/contract-service.ts");
const mockInsertContract = jest.fn();
const mockFindAllJobsOfContracts = jest.fn();

ContractService.prototype.insertContract = mockInsertContract;
ContractService.prototype.findAllJobsOfContracts = mockFindAllJobsOfContracts;

const contractController = new ContractController();

const app = express();
app.use(express.json());

app.post("/contracts", (req: Request, resp: Response) => contractController.insertContract(req, resp));
app.get("/contracts/jobs/:idContract", (req: Request, resp: Response) => contractController.findAllJobsOfContracts(req, resp));

describe("Contract Controller", () => {
    test("Should return a list of Contracts", async () => {
        const mockContractsList = [{ id: 1, description: "Job 1" }, { id: 2, description: "Job 2" }];
        mockFindAllJobsOfContracts.mockResolvedValue(mockContractsList);
        const response = await request(app)
            .get('/contracts/jobs/1');
        expect(response.body).toEqual(mockContractsList);
        expect(response.status).toBe(200);
        expect(mockFindAllJobsOfContracts).toHaveBeenCalledWith(1);
    })


    test("Should return 201 when a contract is successfulle created", async () => {
        const mockContract = { terms: "Test Terms", clientId: 1, operationDate: '2024-10-07', status: 'false' };
        mockInsertContract.mockResolvedValue(mockContract);
        const response = await request(app)
            .post('/contracts')
            .send(mockContract);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockContract);
        expect(mockInsertContract).toHaveBeenCalledWith(mockContract);
        expect(mockInsertContract).toHaveBeenCalledTimes(1)
    })
})