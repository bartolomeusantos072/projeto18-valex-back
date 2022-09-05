import  database from "../config/database";
import { TransactionTypes } from "./cardRepository";

export interface Business {
  id: number;
  name: string;
  type: TransactionTypes;
}

export async function findById(id: number) {
  const result = await database.query(
    "SELECT * FROM businesses WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
