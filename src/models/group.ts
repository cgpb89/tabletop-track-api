import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
    name: string;
    adminUser: mongoose.Types.ObjectId[];
    players: mongoose.Types.ObjectId[]
}

const GroupSchema = new Schema({
    adminUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        ref: 'User'
    }]
});

export default mongoose.model('Group', GroupSchema);