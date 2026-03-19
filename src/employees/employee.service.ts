import { db } from '../_helpers/db';
import { Employee, EmployeeCreationAttributes } from './employee.model';

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<Employee[]> {
    return await db.Employee.findAll({
        include: [
            { model: db.User, attributes: ['email'] },
            { model: db.Department, attributes: ['name'] }
        ]
    });
}

async function getById(id: number): Promise<Employee> {
    return await getEmployee(id);
}

async function create(params: any): Promise<void> {
    // Validate user exists
    const user = await db.User.findOne({ where: { email: params.userEmail } });
    if (!user) throw 'User not found';

    // Validate department exists
    const department = await db.Department.findByPk(params.departmentId);
    if (!department) throw 'Department not found';

    // Create employee
    await db.Employee.create({
        employeeId: params.employeeId,
        userId: user.id,
        position: params.position,
        departmentId: params.departmentId,
        hireDate: params.hireDate
    });
}

async function update(id: number, params: Partial<EmployeeCreationAttributes>): Promise<void> {
    const employee = await getEmployee(id);
    await employee.update(params);
}

async function _delete(id: number): Promise<void> {
    const employee = await getEmployee(id);
    await employee.destroy();
}

async function getEmployee(id: number): Promise<Employee> {
    const employee = await db.Employee.findByPk(id);
    if (!employee) throw 'Employee not found';
    return employee;
}