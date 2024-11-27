import { Profile, ProfileAtributes } from "../models/profile-model";
export class ProfileRespository {

    public async createProfile(dataProfile: ProfileAtributes) {
        try {
            const newProfile = await Profile.create(dataProfile);
            return newProfile;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    public async findById(idProfile: number) {
        const profileResult: Profile = await Profile.findByPk(idProfile);

        if (!profileResult) {
            throw new Error(`Profile not found with id${idProfile}`)
        }
        return profileResult;
    }

    public async getAllProfiles() {
        const profiles: Profile[] = await Profile.findAll();
        return profiles;
    }

    public async getBalanceById(idProfile: number) {
        const profile: Profile = await Profile.findByPk(idProfile, {
            attributes: ['balance', 'firstName']
        });
        if (!profile) {
            throw new Error(`Profile not found with id ${idProfile}`)
        }
        return profile ? Number(profile.balance) : null;
    }
}