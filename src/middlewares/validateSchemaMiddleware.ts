import { Response, Request, NextFunction } from 'express';

export function validateSchemaMiddleware(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {

            throw {
                type: 'bad_request',
                message: `Data validation: ${error.details.map((detail: { message: string; }) => detail.message)}`
            }

        }
        
        next();
    }
}

