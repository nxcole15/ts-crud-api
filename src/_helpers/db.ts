// src/_helpers/db.ts
import config from '../../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

export interface Database {
    User: any; //We'll type this properly after creating the model
    Department: any; //We'll type this properly after creating the model
    Employee: any; //We'll type this properly after creating the model
    Request: any; //We'll type this properly after creating the model
    Transfer: any; //We'll type this properly after creating the model
}

export const db: Database = {} as Database;

export async function initialize(): Promise<void> {
    const { host, port, user, password, database } = config.database;

    //Create database if it doesn't exist
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    //Connect to database with Sequelize
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql'});

    //Initialize models
    const { default: userModel } = await import('../users/user.model');
    db.User = userModel(sequelize);

    const { default: departmentModel } = await import('../departments/department.model');
    db.Department = departmentModel(sequelize);

    const { default: employeeModel } = await import('../employees/employee.model');
    db.Employee = employeeModel(sequelize);

    const { default: requestModel } = await import('../requests/request.model');
    db.Request = requestModel(sequelize);

    const { default: transferModel } = await import('../transfers/transfer.model');
    db.Transfer = transferModel(sequelize);

   
    //Sync models with database
    await sequelize.sync({ alter: true});

    // Define associations
    if (db.User.associate) db.User.associate(db);
    if (db.Department.associate) db.Department.associate(db);
    if (db.Employee.associate) db.Employee.associate(db);
    if (db.Request.associate) db.Request.associate(db);
    if (db.Transfer.associate) db.Transfer.associate(db);

    console.log(' Database initialized and models synced');
}