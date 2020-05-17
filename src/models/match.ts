import mongoose from "mongoose";
const { Schema } = mongoose;

const MatchSchema = new Schema({
    game: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    group: {
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }
    }
});

export default mongoose.model('Match', MatchSchema);