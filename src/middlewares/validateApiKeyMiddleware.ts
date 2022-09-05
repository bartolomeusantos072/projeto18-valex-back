import { Response, Request, NextFunction } from "express";


export async function validateApiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    
    const key =req.headers['x-api-key'];

    if (!key) {
        throw{
            type:'unauthorized',
            message:'x-api-key is required'
        }
    }
    
    next();
}
