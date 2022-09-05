import database from "../config/database";

export interface Employee {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
    companyId: number;
}

export async function findById(id: number) {
    const {rows} = await database.query(`SELECT * FROM employees WHERE id=$1`, [id]);
    console.log("empregado",rows);
    return rows[0];
}

export async function findByEmployeeOnCompany(id: number, companyId: number) {
    const result = await database.query(`
      SELECT * FROM employees WHERE id=$1 AND employees."companyId" =$2`, [id, companyId]
    )
    return result.rows[0];
}