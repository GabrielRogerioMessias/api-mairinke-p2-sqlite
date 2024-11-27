import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../shared/database'
import { Contract } from './contract-model';
import { Deposit } from './deposit-model';

export class ProfileAtributes {
    public id?: number;
    public firstName!: string;
    public profession!: string;
    public balance!: number;
    public type!: string;
}

interface ProfileCreationAtributes extends Optional<ProfileAtributes, 'id'> { }

export class Profile extends Model<ProfileAtributes, ProfileCreationAtributes> {
    public id!: number;
    public firstName!: string;
    public profession!: string;
    public balance!: number;
    public type!: string;

    public static initModel() {
        Profile.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profession: {
                type: DataTypes.STRING,
                allowNull: false
            },
            balance: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },

        }, {
            sequelize,
            tableName: 'tb_profile'
        })
    }

}

