import { sequelize } from '../shared/database';
import { Profile } from './profile-model';
import { Contract } from './contract-model';
import { Deposit } from './deposit-model';
import { Job } from './job-model';
import { Payment } from './payment-model';

export class InitializeClass {
    public static initialize() {
        Profile.initModel();
        Payment.initModel();
        Job.initModel();
        Deposit.initModel();
        Contract.initModel();

        Profile.hasMany(Deposit, {
            foreignKey: 'clientId',
            as: 'deposits'
        });
        Deposit.belongsTo(Profile, {
            foreignKey: 'clientId',
            as: 'client'
        });
        Profile.hasMany(Contract, {
            foreignKey: 'clientId',
            as: 'contracts'
        });
        Contract.belongsTo(Profile, {
            foreignKey: 'clientId',
            as: 'client'
        });
        Contract.hasMany(Job, {
            foreignKey: 'contractId',
            as: 'jobs'
        });
        Job.belongsTo(Contract, {
            foreignKey: 'contractId',
            as: 'contract'
        });
        Job.hasMany(Payment, {
            foreignKey: 'jobId',
            as: 'payments'
        });
        Payment.belongsTo(Job, {
            foreignKey: 'jobId',
            as: 'job'
        });
    }
}
