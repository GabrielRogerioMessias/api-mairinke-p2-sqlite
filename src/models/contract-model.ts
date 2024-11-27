import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../shared/database";

export class ContractAtributes {
    public id?: number;
    public terms!: string;
    public clientId: number;
    public operationDate: Date;
    public status: boolean;
}

interface ContractCreationAtributes extends Optional<ContractAtributes, 'id'> { }

export class Contract extends Model<ContractAtributes, ContractCreationAtributes> {
    public id!: number;
    public terms!: string;
    public clientId: number;
    public operationDate: Date;
    public status: boolean;

    public static initModel() {
        Contract.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }, clientId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            terms: {
                type: DataTypes.STRING,
                allowNull: false
            },
            operationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'tb_contract'
        })
    }
}

