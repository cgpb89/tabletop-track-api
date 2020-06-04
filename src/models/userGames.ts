import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUserGames extends mongoose.Document {
    userId: string;
    gameId: string;
  }

const UserGamesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    gameId: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
});

export default mongoose.model<IUserGames>('UserGames', UserGamesSchema);