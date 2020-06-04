import Match from "../models/match";
import UserGame from "../models/userGames";
import Group from "../models/group";
import { dataBaseQuery } from "../database/databaseQuery";

async function listGames(req: any, res: any, next: any) {
    const games = await UserGame.find({userId: req.body.userId})
    .populate('game');
    res.send(games);
}

async function associateGame(req: any, res: any, next: any) {
    const game = await UserGame.create({
        userId: req.body.userId,
        gameId: req.body.gameId,
        game: req.body.gameId,
    });
    res.send(game);
}


// EXPORT ALL FUNCTIONS
export {
    associateGame,
    listGames,
};