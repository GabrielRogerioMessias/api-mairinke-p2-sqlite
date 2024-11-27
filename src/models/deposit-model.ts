import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../shared/database'


export class DepositAtributes {
    public id?: number;
    public clientId!: number;
    public operationDate!: Date;
    public depositValue!: number;
}

interface DepositCreationAtributes extends Optional<DepositAtributes, 'id'> { }

export class Deposit extends Model<DepositAtributes, DepositCreationAtributes> {
    public id?: number;
    public clientId!: number;
    public operationDate!: Date;
    public depositValue!: number;

    public static initModel() {
        Deposit.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            depositValue: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            operationDate: {
                type: DataTypes.DATE,
                allowNull: false
            }

        }, {
            sequelize,
            tableName: 'tb_deposit'
        })
    }
}


