import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface RequestAttributes {
    id: number;
    userId: number;
    type: string;
    itemName: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestCreationAttributes
    extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Request
    extends Model<RequestAttributes, RequestCreationAttributes>
    implements RequestAttributes {

        public id!: number;
        public userId!: number;
        public type!: string;
        public itemName!: string;
        public status!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

        static associate(models: { Request: typeof Request; User: any }) {
            models.Request.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
}

export default function (sequelize: Sequelize): typeof Request {
    Request.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            itemName: {
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
            modelName: 'Request',
            tableName: 'requests',
            timestamps: true,

        }    
    );
    return Request;
}