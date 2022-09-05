import  database  from "../config/database";


export async function findByApiKey(apiKey:string) {
  
  const {rows}:{rows:any[]} = await database.query(`SELECT companies.id FROM companies WHERE companies."apiKey"=$1`,[apiKey]);
  return rows[0];
}

