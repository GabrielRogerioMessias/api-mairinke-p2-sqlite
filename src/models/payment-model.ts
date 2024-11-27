import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../shared/database'
import { Job } from "./job-model";


export class PaymentAtributes {
    public id?: number;
    public jobId!: number;
    public operation!: Date;
    public paymentValue!: number;
}

interface PaymentCreateAtributes extends Optional<PaymentAtributes, 'id'> { }

export class Payment extends Model<PaymentAtributes, PaymentCreateAtributes> {
    public id!: number;
    public jobId!: number;
    public operation!: Date;
    public paymentValue!: number;

    public static initModel() {
        Payment.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            jobId: {
                type: DataTypes.INTEGER,
                allowNull: false,

            },
            operation: {
                type: DataTypes.DATE,
                allowNull: false
            },
            paymentValue: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'tb_payment'
        })
    }
}

