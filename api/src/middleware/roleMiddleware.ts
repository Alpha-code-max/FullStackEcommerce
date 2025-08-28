import { Request, Response, NextFunction } from 'express';

const  isAuthorized = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.session.user?.role || req.session.user?.role !== role)
            return res.status(403).json({error: "Forbidden"})
        next()
    }
}

export default isAuthorized;