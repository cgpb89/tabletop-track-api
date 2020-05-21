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
    console.log(match);
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
    console.log(req.body);
    const adminUsersSent = checkIfUserIsAdmin(req.body.userId);
    if (adminUsersSent !== "") {
        res.status(200).send(`${adminUsersSent}`);
        return;
    }
    // Check if the user is an admin of the match to be editted
    const canEdit = await canUserEdit(req.body.userId, req.body.groupId);
    if (canEdit !== "") {
        res.status(200).send(`${canEdit}`);
        return;
    }

    // If the user does not exist do not add it to the matchs.players[]
    req.body.players = await checkIfPlayerExist(req.body.players);

    const result = await Match.findByIdAndUpdate(req.params.id, {
        adminUsers: req.body.adminUsers,
        name: req.body.name,
        players: req.body.players
    });

    const updatedMatch = await Match.findById(req.params.id);

    if (!result) {
        res.status(404).send("The match does not exist");
    }
    res.send(`${updatedMatch}`);
}

async function deleteMatch(req: any, res: any, next: any) {
    // Check if the user is an admin of the match to be editted
    const canEdit = await canUserDeleteMatch(req.params.userId, req.params.id);
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

function checkIfUserIsAdmin(userId: string): string {
    if (!userId.length) {
        return "You must be and admin to edit this match.";
    }
    return "";
}

async function canUserDeleteMatch(userId: string, matchId: string): Promise<string> {

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