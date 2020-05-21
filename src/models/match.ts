import mongoose from "mongoose";
const { Schema } = mongoose;

const MatchSchema = new Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    date: {
        type: Date,
        default: Date.now
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
});

export default mongoose.model('Match', MatchSchema);