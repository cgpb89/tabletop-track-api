import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    role: {
        type: String,
        required: true,
    },
    image: String
});

export default mongoose.model('User', UserSchema);