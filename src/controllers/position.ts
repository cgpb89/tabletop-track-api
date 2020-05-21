import Position from "../models/position";
import User from "../models/user";
import Group from "../models/group";
import Match from "../models/match";
import Game from "../models/game";

async function listPosition(req: any, res: any, next: any) {
    const positions = await Position.find()
        .populate('game', 'name');
    res.send(positions);
}

async function getPosition(req: any, res: any, next: any) {
    const position = await Position.findById(req.params.id)
        .populate('game', 'name')
        .populate('player', 'name');

    res.send(position);
}

async function createPosition(req: any, res: any, next: any) {
    const userAsAdmin = await canUserAddEditPosition(req.body.userId, req.body.matchId);
    if (userAsAdmin !== "") {
        res.status(200).send(`${userAsAdmin}`);
        return;
    }
    // If the user does not exist do not add it
    const player = await checkIfPlayerExist(req.body.player);
    if (player !== "") {
        res.status(200).send(`${player}`);
        return;
    }
    const game = await checkIfGameExist(req.body.game);
    if (game !== "") {
        res.status(200).send(`${game}`);
        return;
    }

    req.body.match = req.body.matchId;

    const position = await Position.create(req.body);
    res.send(`${position}`);
}

async function editPosition(req: any, res: any, next: any) {
    const userIsAdmin = await canUserAddEditPosition(req.body.userId, req.body.matchId);
    if (userIsAdmin !== "") {
        res.status(200).send(`${userIsAdmin}`);
        return;
    }
    req.body.match = req.body.matchId;

    // If the user does not exist do not add it
    const player = await checkIfPlayerExist(req.body.player);
    if (player !== "") {
        res.status(200).send(`${player}`);
        return;
    }

    const result = await Position.findByIdAndUpdate(req.params.id, {
        player: req.body.player,
        game: req.body.game,
        position: req.body.position,
        points: req.body.points,
        match: req.body.match
    });

    const updatedPosition = await Position.findById(req.params.id);

    if (!result) {
        res.status(404).send("The position does not exist");
    }
    res.send(`${updatedPosition}`);
}

async function deletePosition(req: any, res: any, next: any) {
    // Check if the user is an admin of the position to be editted
    const position = await Position.findByIdAndDelete(req.params.id);

    if (!position) {
        res.status(404).send("The position does not exist");
        return;
    }
    res.send(`Position deleted successfully`);
}

// VALIDATED FUNCTIONS
async function checkIfPlayerExist(playerId: string): Promise<string> {
    const user = await User.findById(playerId);

    if (!user) {
        return "Player does not exist";
    }

    return "";
}

async function checkIfGameExist(gameId: string): Promise<string> {
    const game = await Game.findById(gameId);

    if (!game) {
        return "Game does not exist";
    }

    return "";
}

async function canUserEdit(userId: string, groupId: string): Promise<string> {
    if (!userId) {
        return "Please send the user ID";
    }

    const group = await (await Group.find({ _id: groupId, adminUsers: { $in: [userId] } }));

    if (!group.length) {
        return "You are not an admin of this group";
    }
    return "";
}

async function canUserAddEditPosition(userId: string, matchId: string): Promise<string> {

    const match = await (await Match.findById(matchId));

    if (!match) {
        return "Match does not exist";
    }

    return canUserEdit(userId, match.toObject().groupId);
}


// EXPORT ALL FUNCTIONS
export {
    createPosition,
    deletePosition,
    editPosition,
    getPosition,
    listPosition,
};