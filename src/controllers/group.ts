import Group from "../models/group";

async function listGroup(req: any, res: any, next: any) {
    const groups = await Group.find();
    res.send(groups);
}

async function getGroup(req: any, res: any, next: any) {
    const group = await Group.findById(req.params.id);
    res.send(group);
}

async function createGroup(req: any, res: any, next: any) {
    const group = await Group.create(req.body);
    res.send(`${group}`);
}

async function editGroup(req: any, res: any, next: any) {
    const result = await Group.findByIdAndUpdate(req.params.id, {
        adminUser: req.body.adminUser,
        name: req.body.name,
        players: req.body.players,
        matches: req.body.maches
    });

    const updatedGroup = await Group.findById(req.params.id);

    if (!result) {
        res.status(404).send("The group does not exist");
    }
    res.send(`${updatedGroup}`);
}

async function deleteGroup(req: any, res: any, next: any) {
    await Group.findByIdAndDelete(req.params.id);
    res.send(`Group deleted successfully`);
}

// EXPORT ALL FUNCTIONS
export {
    createGroup,
    deleteGroup,
    editGroup,
    getGroup,
    listGroup,
};