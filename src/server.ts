// src/server.ts

import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/errorHandler';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';
import departmentController from './departments/department.controller';
import employeeController from './employees/employee.controller';
import requestController from './requests/request.controller';
import transferController from './transfers/transfer.controller';

const app: Application = express ();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:  true }));
app.use(cors());

// API Routes
app.use('/users', usersController);
app.use('/departments', departmentController);
app.use('/employees', employeeController);
app.use('/requests', requestController);
app.use('/transfers', transferController);

//Global Error Handler (must be last)
app.use(errorHandler);

// Start server + initialize database
const PORT = process.env.PORT || 4000;

initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Test with: POST /users with { email, password, ...}`);
        });
    })
    .catch((err) => {
        console.error(' Failed to initialize database:', err);
        process.exit(1);
    });