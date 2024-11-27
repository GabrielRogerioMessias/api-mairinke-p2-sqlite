import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../shared/database'

export class JobAtributes {
    public id?: number;
    public contractId: number;
    public description: string;
    public operationDate: Date;
    public paymentDate: Date;
    public price: number;
    public paid: boolean;
}
interface JobCreateionAtributes extends Optional<JobAtributes, 'id'> { }
export class Job extends Model<JobAtributes, JobCreateionAtributes> {
    public id!: number;
    public contractId: number;
    public description: string;
    public operationDate: Date;
    public paymentDate: Date;
    public price: number;
    public paid: boolean;

    public static initModel() {
        Job.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            contractId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            operationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            paymentDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            paid: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'tb_job'
        })
    }
}

