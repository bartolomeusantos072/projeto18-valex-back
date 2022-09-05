import database from "../config/database";
import { mapObjectToUpdateQuery } from "../utils/sqlUtils";

export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Card {
  id: number;
  employeeId: number;
  number: string|any;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password?: string|any;
  isVirtual: boolean;
  originalCardId?: number|any;
  isBlocked: boolean;
  type: TransactionTypes;
}

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;


export async function find() {
  const result = await database.query("SELECT * FROM cards");
  return result.rows;
}
//buscar cartão pelo number
export async function findById(cardId: number) {
  const result = await database.query(
    "SELECT * FROM cards WHERE cards.id=$1",
    [cardId]
    );
  
  return result.rows[0];
}

//buscar por tipo e empregado
export async function findByTypeAndEmployeeId( 
  type: TransactionTypes,employeeId: number
) {
    
    const result = await database.query(
    `SELECT * FROM cards WHERE cards.type=$1 AND cards."employeeId"=$2`,
    [type, employeeId]
  );

  return result.rows;
}
//buscar por Cartão
export async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  const result = await database.query(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  );

  return result.rows[0];
}
//inserir cartao
export async function insert(cardData: CardInsertData) {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

  database.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `,
    [ employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ]
  );
  
}
//atualizar cartão
export async function update(id: number, cardData: CardUpdateData) {

  const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
      object: cardData,
      offset: 2,
    });

 return database.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `,
    [id, ...cardValues]
  );

}
//remover cartão
export async function remove(id: number) {
  database.query("DELETE FROM cards WHERE id=$1", [id]);
}

