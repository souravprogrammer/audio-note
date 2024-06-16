import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    provider: string;
    image: string;
    // userId: string;
    // path: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    provider: { type: String },
    image: { type: String }
    // path: { type: String, required: true, default: "note" }
    // userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

export default mongoose.model<User>('user', UserSchema);
