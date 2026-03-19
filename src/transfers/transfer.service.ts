import { db } from '../_helpers/db';
import { Transfer, TransferCreationAttributes } from './transfer.model';

export const transferService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    approveTransfer,
};

async function getAll(): Promise<Transfer[]> {
    return await db.Transfer.findAll({
        include: [
            { model: db.Employee, as: 'employee', include: [{ model: db.User, as: 'user' }] },
            { model: db.Department, as: 'fromDepartment' },
            { model: db.Department, as: 'toDepartment' },
        ],
    });
}

async function getById(id: number): Promise<Transfer> {
    return await getTransfer(id);
}

async function create(params: TransferCreationAttributes): Promise<void> {
    // Validate that employee exists and get current department
    const employee = await db.Employee.findByPk(params.employeeId);
    if (!employee) throw 'Employee not found';
    
    // Set fromDepartmentId to current department if not provided
    if (!params.fromDepartmentId) {
        params.fromDepartmentId = employee.departmentId;
    }
    
    // Validate departments exist
    const fromDept = await db.Department.findByPk(params.fromDepartmentId);
    if (!fromDept) throw 'From department not found';
    
    const toDept = await db.Department.findByPk(params.toDepartmentId);
    if (!toDept) throw 'To department not found';
    
    // Create transfer record
    await db.Transfer.create(params);
}

async function update(id: number, params: Partial<TransferCreationAttributes>): Promise<void> {
    const transfer = await getTransfer(id);
    await transfer.update(params);
}

async function _delete(id: number): Promise<void> {
    const transfer = await getTransfer(id);
    await transfer.destroy();
}

async function approveTransfer(id: number): Promise<void> {
    const transfer = await getTransfer(id);
    if (transfer.status !== 'Pending') throw 'Transfer is not pending';
    
    // Update employee's department
    const employee = await db.Employee.findByPk(transfer.employeeId);
    if (!employee) throw 'Employee not found';
    
    await employee.update({ departmentId: transfer.toDepartmentId });
    
    // Update transfer status
    await transfer.update({ status: 'Approved' });
}

async function getTransfer(id: number): Promise<Transfer> {
    const transfer = await db.Transfer.findByPk(id, {
        include: [
            { model: db.Employee, as: 'employee', include: [{ model: db.User, as: 'user' }] },
            { model: db.Department, as: 'fromDepartment' },
            { model: db.Department, as: 'toDepartment' },
        ],
    });
    if (!transfer) throw 'Transfer not found';
    return transfer;
}