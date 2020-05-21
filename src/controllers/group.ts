import Group from "../models/group";
import User from "../models/user";

async function listGroup(req: any, res: any, next: any) {
    const groups = await Group.find();
    res.send(groups);
}

async function getGroup(req: any, res: any, next: any) {
    const group = await Group.findById(req.params.id);
    res.send(group);
}

async function createGroup(req: any, res: any, next: any) {
    const adminUsersSent = checkIfAdminUsersAreSent(req.body.adminUsers);
    if (adminUsersSent !== "") {
        res.status(200).send(`${adminUsersSent}`);
        return;
    }
    // If the user does not exist do not add it to the groups.players[]
    req.body.players = await checkIfPlayerExist(req.body.players);

    const group = await Group.create(req.body);
    res.send(`${group}`);
}

async function editGroup(req: any, res: any, next: any) {
    const adminUsersSent = checkIfAdminUsersAreSent(req.body.adminUsers);
    if (adminUsersSent !== "") {
        res.status(200).send(`${adminUsersSent}`);
        return;
    }
    // Check if the user is an admin of the group to be editted
    const canEdit = await canUserEdit(req.body.userId, req.params.id);
    if (canEdit !== "") {
        res.status(200).send(`${canEdit}`);
        return;
    }

    // If the user does not exist do not add it to the groups.players[]
    req.body.players = await checkIfPlayerExist(req.body.players);

    const result = await Group.findByIdAndUpdate(req.params.id, {
        adminUsers: req.body.adminUsers,
        name: req.body.name,
        players: req.body.players
    });

    const updatedGroup = await Group.findById(req.params.id);

    if (!result) {
        res.status(404).send("The group does not exist");
    }
    res.send(`${updatedGroup}`);
}

async function deleteGroup(req: any, res: any, next: any) {
    // Check if the user is an admin of the group to be editted
    const canEdit = await canUserEdit(req.params.userId, req.params.id);
    if (canEdit !== "") {
        res.status(200).send(`${canEdit}`);
        return;
    }
    await Group.findByIdAndDelete(req.params.id);
    res.send(`Group deleted successfully`);
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
    const group = await (await Group.findById(groupId));

    if (!userId) {
        return "Please send the user ID";
    }

    if (!group) {
        return "The group does not exist";
    }

    const user = group.toObject().adminUsers.filter((i: any) => userId.toString() === i.toString())

    return !user.length ? "You are not an admin of this group" : "";
}

function checkIfAdminUsersAreSent(adminUsers: string[]): string {
    if (!adminUsers.length) {
        return "You must set a user as admin";
    }
    return "";
}

// EXPORT ALL FUNCTIONS
export {
    createGroup,
    deleteGroup,
    editGroup,
    getGroup,
    listGroup,
};