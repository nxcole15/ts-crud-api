# Employee Management API

A CRUD API for managing employees, departments, requests, and department transfers.

## Features

- User Management
- Department Management
- Employee Management (with hire dates and positions)
- Request Tracking (for equipment, resources, etc.)
- Employee Transfer System (transfer between departments)

## Prerequisites

- Node.js
- MySQL
- npm

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database in `config.json`:
   ```json
   {
     "database": {
       "host": "localhost",
       "port": 3306,
       "user": "root",
       "password": "your_password",
       "database": "employee_db"
     }
   }
   ```

## Running the Project

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm start
```

Server runs on `http://localhost:4000`

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Departments
- `GET /departments` - Get all departments
- `POST /departments` - Create department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Employees
- `GET /employees` - Get all employees
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Requests
- `GET /requests` - Get all requests
- `POST /requests` - Create request
- `PUT /requests/:id` - Update request
- `DELETE /requests/:id` - Delete request

### Transfers
- `GET /transfers` - Get all transfers
- `POST /transfers` - Create transfer request
- `POST /transfers/:id/approve` - Approve transfer
- `PUT /transfers/:id` - Update transfer
- `DELETE /transfers/:id` - Delete transfer

## Database Tables

- **users** - User accounts
- **departments** - Company departments
- **employees** - Employee records
- **requests** - Item/resource requests
- **transfers** - Employee transfer records

## Project Structure

```
src/
├── users/
├── departments/
├── employees/
├── requests/
├── transfers/
├── _helpers/
├── _middleware/
└── server.ts
```

## Tech Stack

- TypeScript
- Express.js
- Sequelize ORM
- MySQL
- Joi (Validation)