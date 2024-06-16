import express, { Request, Response, NextFunction } from "express";
import cors from "cors"
import mongoose from 'mongoose';
import { ErrorHandler } from "../middleware/errorHandler.middleware";
// importing middlewares

import authenticate from "../middleware/authenticate.middlewate";
// importing a routes
import noteRouter from "../routes/notes.route"
import authRouter from "../routes/auth.route"

type CustomExpress = {
    run: () => void
} & typeof app



const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// authenticate
app.use('/notes', noteRouter);
app.use('/auth', authRouter);


app.get("/", () => {
    throw Error("No route match")

})

// Error handler MiddleWare
app.use(ErrorHandler);

(app as CustomExpress).run = async () => {
    await mongoose.connect(process.env.DB_URI!);
    console.info("database connected");
    app.listen(process.env.PORT ?? 4000, () => console.info("server kickoff at", process.env.PORT ?? 400))
}

export default app as CustomExpress;
