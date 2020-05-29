import Match from "../models/match";
import User from "../models/user";
import Group from "../models/group";

async function listMatch(req: any, res: any, next: any) {
    const matchs = await Match.find()
        .populate('groupId', 'name')
        .populate('gameId', 'name numPlayers');;
    res.send(matchs);
}

async function getMatch(req: any, res: any, next: any) {
    const match = await Match.findById(req.params.id)
        .populate('groupId', 'name')
        .populate('gameId', 'name numPlayers');
    res.send(match);
}

async function createMatch(req: any, res: any, next: any) {
    const userAsAdmin = await canUserEdit(req.body.userId, req.body.groupId);
    if (userAsAdmin !== "") {
        res.status(200).send(`${userAsAdmin}`);
        return;
    }

    // If the user does not exist do not add it to the matchs.players[]
    req.body.players = await checkIfPlayerExist(req.body.players);

    const match = await Match.create(req.body);
    res.send(`${match}`);
}

async function editMatch(req: any, res: any, next: any) {
    // Check if the user is an admin of the match to be editted
    const canEdit = await canUserEditMatch(req.body.userId, req.params.id);
    if (canEdit !== "") {
        res.status(200).send(`${canEdit}`);
        return;
    }

    // If the user does not exist do not add it to the matchs.players[]
    req.body.players = await checkIfPlayerExist(req.body.players);

    const result = await Match.findByIdAndUpdate(req.params.id, {
        gameId: req.body.gameId,
        groupId: req.body.groupId,
        players: req.body.players
    }, {new: true});

    if (!result) {
        res.status(404).send("The match does not exist");
    }
    res.send(`${result}`);
}

async function deleteMatch(req: any, res: any, next: any) {
    // Check if the user is an admin of the match to be editted
    const canEdit = await canUserEditMatch(req.params.userId, req.params.id);
    if (canEdit !== "") {
        res.status(200).send(`${canEdit}`);
        return;
    }
    await Match.findByIdAndDelete(req.params.id);
    res.send(`Match deleted successfully`);
}

// VALIDATED FUNCTIONS
async function checkIfPlayerExist(players: string[]): Promise<string[]> {
    const playersToAdd: string[] = []
    for (const i of players) {
        const user = await User.findById(i);

        if (user) {
            playersToAdd.push(user._id);
        }
    }

    return playersToAdd;
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

async function canUserEditMatch(userId: string, matchId: string): Promise<string> {

    const match = await (await Match.findById(matchId));

    if(!match) {
        return "Match does not exist";
    }

    return canUserEdit(userId, match.toObject().groupId);
}


// EXPORT ALL FUNCTIONS
export {
    createMatch,
    deleteMatch,
    editMatch,
    getMatch,
    listMatch,
};