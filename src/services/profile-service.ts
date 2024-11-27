import { Profile, ProfileAtributes } from "../models/profile-model";
import { ProfileRespository } from "../repositories/profile-repository";

export class ProfileService {
    private profileRepository: ProfileRespository;
    constructor() {
        this.profileRepository = new ProfileRespository();
    }

    public async createProfile(dataProfile: ProfileAtributes) {
        const newProfile = await this.profileRepository.createProfile(dataProfile);
        return newProfile;
    }

    public async getAllProfiles() {
        return this.profileRepository.getAllProfiles()
    }

    public async getBalance(id: number): Promise<number> {
        const balance = await this.profileRepository.getBalanceById(id);
        if (balance === null) {
            throw new Error('Profile not found');
        }
        return balance;
    }
}