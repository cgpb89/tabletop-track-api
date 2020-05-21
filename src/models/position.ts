import mongoose from "mongoose";
const { Schema } = mongoose;

const PositionSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    position: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        unique: true
    },
});

export default mongoose.model('Position', PositionSchema);