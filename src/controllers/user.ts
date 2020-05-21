import User from "../models/user";

async function listUser(req: any, res: any, next: any) {
    const users = await User.find();
    res.send(users);
}

async function getUser(req: any, res: any, next: any) {
    res.send(`Get GAME`);
}

async function createUser(req: any, res: any, next: any) {
    const user = await User.create(req.body);
    res.send(`${user}`);
}

async function editUser(req: any, res: any, next: any) {

    res.send(`Edit Uset`);
}

async function deleteUser(req: any, res: any, next: any) {
    res.send(`DELETE User`);
}

// EXPORT ALL FUNCTIONS
export {
    createUser,
    deleteUser,
    editUser,
    getUser,
    listUser,
};