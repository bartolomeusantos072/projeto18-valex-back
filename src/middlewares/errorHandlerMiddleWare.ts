import { Request, Response, NextFunction } from "express";

export default function errorHandlerMiddleWare(error: any, req: Request, res: Response, next: NextFunction) {

  switch (error.type) {
    case 'not_found':
      res.status(404).send(error.message);
      break;
    case 'bad_request':
      res.status(400).send(error.message);
      break;
    case 'unauthorized':
      res.status(401).send(error.message);
      break;
    case 'conflict':
      res.status(409).send(error.message);
    default:
      res.status(500).send(error);
  }

}