import passport from 'passport';
import { userHasPermision } from "../utils/userPermisions";

export function asyncErrorHandler(fn: any) {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    }
}

export async function isUserAdmin(req: any, res: any, next: any) {
    const hasPermision = await userHasPermision(req.user._id);
    if(!hasPermision){
        res.send(`You are not authorize to fullfil this action`);
        return;
    }
    next();
};