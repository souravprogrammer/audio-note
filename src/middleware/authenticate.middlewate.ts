import { Request, Response, NextFunction } from "express";
import jtw from "jsonwebtoken";
import { ApiError } from "../lib/ApiError";

interface RequestCustom extends Request {
    user?: any
}
const authenticate = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        console.log("its running")
        const token = req?.headers?.authorization?.split(" ")[1];
        console.log(req.headers);
        if (!token) {
            throw new ApiError("Unauthorized - Token missing", 401);
        }
        // Verify JWT token here
        // Add authentication logic here
        // For example, you can check if the user is authenticated and authorized
        // You can also perform additional checks or actions based on the user object

        const decodedToken = verifyToken(token);
        // Authentication logic
        if (!decodedToken) {
            throw new ApiError("Unauthorized - Invalid Token", 401);
        }
        req.user = decodedToken.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    // Verify JWT token here
    // Add authentication logic here
    // For example, you can check if the user is authenticated and authorized
    // You can also perform additional checks or actions based on the user object
}
function verifyToken(token: string): any {
    try {
        const decoded = jtw.verify(token, process.env.SECRET_KEY!);
        return decoded;
    } catch (error) {
        console.log((error as Error).message)
        return null;
    }
};

export default authenticate;

