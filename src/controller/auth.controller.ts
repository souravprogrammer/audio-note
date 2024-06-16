
import { asyncHandler } from "../lib/asyncHandler";
import { ApiError } from "../lib/ApiError";
import { ApiResponse } from "../lib/ApiResponse";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

type User = {
    name: string;
    email: string;
    image: string;
    provider?: string;
}

function generateUser(user: any): User {
    return {
        name: user?.name ?? null,
        email: user?.email ?? null,
        image: user?.image ?? null,
        provider: user?.provider ?? null,
    }

}
export const AuthByProviders = asyncHandler(async (req, res, next) => {

    const user: Partial<User> = req.body;
    const isUser = await userModel.findOne({ email: user.email });
    console.log("found is User", isUser);
    if (isUser) {
        console.log("in found");

        const token = generateToken(generateUser(isUser))
        console.log("after generage");

        res.json(new ApiResponse(200, { accessToken: token }, "success"));
        return;
    }


    console.log("user ", user)
    const usersave = new userModel(user);
    await usersave.save();
    const token = generateToken(generateUser(user));
    res.json(new ApiResponse(200, { accessToken: token }, "success"));
})
function generateToken(user: Partial<User>) {
    return jwt.sign(user, process.env.SECRET_KEY!);
}

