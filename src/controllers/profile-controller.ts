import { Profile, ProfileAtributes } from '../models/profile-model';
import { ProfileService } from '../services/profile-service';
import express, { Request, Response } from 'express';
export class ProfileController {
    private profileService: ProfileService;
    constructor() {
        this.profileService = new ProfileService();
    }

    public async createUser(req: Request, resp: Response): Promise<Response> {
        try {
            const { firstName, profession, balance, type }: ProfileAtributes = req.body;
            if (!type || !firstName || !profession || balance === undefined) {
                return resp.status(400).json({ message: 'Missing required fields' });
            }
            const newProfile: ProfileAtributes = { firstName, profession, balance, type };
            const createProfile = await this.profileService.createProfile(newProfile);
            return resp.status(201).json(createProfile);
        } catch (error) {
            return resp.status(500).json({
                message: 'Erro ao criar o perfil',
                error: (error as Error).message,  // Mostrar a mensagem de erro real
            });
        }
    }

    public async getAllProfiles(req: Request, resp: Response): Promise<Response> {
        try {
            const profiles: Profile[] = await this.profileService.getAllProfiles();
            return resp.status(200).json(profiles);
        } catch (error) {
            return resp.status(500).json({
                message: 'Ocorreu um erro ao retornar a lista', error
            })
        }
    }

    public async getBalanceById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const balance = await this.profileService.getBalance(id);
            return res.status(200).json({ id, balance });
        } catch (error) {
            return res.status(404).json({ message: 'Perfil não encontrado', error: error.message });
        }
    }

}