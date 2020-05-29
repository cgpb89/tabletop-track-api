import User from "../models/user";

async function userHasPermision(id: string): Promise<boolean> {
    const user = (await User.findById(id)).toObject();
    if(!user) {
        return false;
    }

    if(user.isAdmin){
        return true;
    }

    return false
}


// EXPORT ALL FUNCTIONS
export {
    userHasPermision
};