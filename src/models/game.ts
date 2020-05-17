import mongoose from "mongoose";
const { Schema } = mongoose;

const GameSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    designer: {
        required: true,
        type: String,
    },
    duration: String,
    name: {
        required: true,
        type: String,
        unique: true
    },
    numPlayers: String,
    language: [
        {
            type: String
        }
    ]
});

export default mongoose.model('Game', GameSchema);