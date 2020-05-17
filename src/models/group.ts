import mongoose from "mongoose";
const { Schema } = mongoose;

const GroupSchema = new Schema({
    adminUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        required: true,
        type: String,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }]
});

export default mongoose.model('Group', GroupSchema);