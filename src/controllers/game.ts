import Game from "../models/game";

async function listGame(req: any, res: any, next: any) {
    const games = await Game.find();
    res.send(games);
}

async function getGame(req: any, res: any, next: any) {
    const game = await Game.findById(req.params.id);
    res.send(game);
}

async function createGame(req: any, res: any, next: any) {
    const game = await Game.create(req.body);
    res.send(`${game}`);
}

async function editGame(req: any, res: any, next: any) {
    const game = req.body;

    const result = await Game.findByIdAndUpdate(req.params.id, {
        designer: game.designer,
        duration: game.duration,
        language: game.language,
        name: game.name,
        numPlayers: game.numPlayers
    });

    const updatedGame = await Game.findById(req.params.id);

    if (!result) {
        res.status(404).send("The game does not exist");
    }
    res.send(`${updatedGame}`);
}

async function deleteGame(req: any, res: any, next: any) {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
        res.status(404).send("The game does not exist");
        return;
    }

    res.send(`Game delete successfully`);
}

// EXPORT ALL FUNCTIONS
export {
    createGame,
    deleteGame,
    editGame,
    getGame,
    listGame,
};