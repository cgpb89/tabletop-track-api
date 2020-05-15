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
    duration: Number,
    name: {
        required: true,
        type: String,
        unique: true
    },
    numPlayers: Number,
    language: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('Game', GameSchema);