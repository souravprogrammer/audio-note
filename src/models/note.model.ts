import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    summary: string;
    // userId: string;
    // path: string;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: false },
    summary: { type: String, required: false },
    // path: { type: String, required: true, default: "note" }
    // userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

export default mongoose.model<INote>('Note', NoteSchema);
