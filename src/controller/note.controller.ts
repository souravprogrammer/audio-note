
import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { ApiError } from "../lib/ApiError";
import { ApiResponse } from "../lib/ApiResponse";
import { generateNoteSummery } from "../agents/summry.agent";
import noteModel from "../models/note.model";

export const generateNote = asyncHandler(async (req, res, next) => {
    const body: { note: string } = req.body as any;
    if (!body.note) throw new ApiError("note is requried", 400)
    const note = await generateNoteSummery(body.note);
    const noteSave = new noteModel({ ...note });
    await noteSave.save();

    res.json(new ApiResponse(200, note, "success"));
})
export const getnotes = asyncHandler(async (req, res, next) => {

    const notes = await noteModel.find({})


    res.json(new ApiResponse(200, notes, "success"));
})

