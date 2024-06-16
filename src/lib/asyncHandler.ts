import { NextFunction, Response, Request } from "express"
import { ApiError } from "./ApiError";
type ControllerFunction = (request: Request, response: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler = (fn: ControllerFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err: unknown) {
            next(new ApiError((err as ApiError).message, (err as ApiError).statusCode || 500))
        }
    }
}

