// src/transfers/transfer.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface TransferAttributes {
    id: number;
    employeeId: number;
    fromDepartmentId: number;
    toDepartmentId: number;
    transferDate: Date;
    reason: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransferCreationAttributes
    extends Optional<TransferAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Transfer
    extends Model<TransferAttributes, TransferCreationAttributes>
    implements TransferAttributes {

        public id!: number;
        public employeeId!: number;
        public fromDepartmentId!: number;
        public toDepartmentId!: number;
        public transferDate!: Date;
        public reason!: string;
        public status!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

        static associate(models: { Transfer: typeof Transfer; Employee: any; Department: any }) {
            models.Transfer.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'employee' });
            models.Transfer.belongsTo(models.Department, { foreignKey: 'fromDepartmentId', as: 'fromDepartment' });
            models.Transfer.belongsTo(models.Department, { foreignKey: 'toDepartmentId', as: 'toDepartment' });
        }
}

export default function (sequelize: Sequelize): typeof Transfer {
    Transfer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fromDepartmentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            toDepartmentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            transferDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Pending',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Transfer',
            tableName: 'transfers',
            timestamps: true,
        }
    );
    return Transfer;
}