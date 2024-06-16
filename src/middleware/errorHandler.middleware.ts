import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../lib/ApiResponse";
import { ApiError } from "../lib/ApiError";
export async function ErrorHandler(error: ApiError | Error, request: Request, response: Response, next: NextFunction) {

    error instanceof ApiError ?
        response.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message)) :
        response.status(500).json(new ApiResponse(500, null, error.message))

}