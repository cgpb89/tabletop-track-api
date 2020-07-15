import User                     from "../models/user";
import passport                 from 'passport';
import { validationResult }     from 'express-validator';
import bcrypt                   from "bcryptjs";
import roles                    from "../utils/roles";
import { userHasPermision }     from "../utils/userPermisions";

// When the user sends a post request to this route, passport authenticates the user based on the
// middleware created previously
async function signup(req: any, res: any, next: any) {
    const user = {
        _id: req.user._id,
        email: req.user.email
    }
    res.json({
        message: 'Signup successfully',
        user
    });
}

async function login(req: any, res: any, next: any) {
    passport.authenticate('login', async (err: any, user: any, info: any) => {
        try {
            if (err || !user) {
                return res.json("User not found");
            }
            req.login(user, { session: false }, async (error: any) => {
                if (error) return next(error)
                // We don't want to store the sensitive information such as the
                // user password in the token so we pick only the email and id
                const body = { _id: user._id, email: user.email };

                const jwtToken = user.generateJWT();

                // Sign the JWT token and populate the payload with the user email and id
                const token = jwtToken;
                // Send back the token to the user
                return res.json({ token });
            });
        } catch (error) {
            console.log("catch", error);
            return next(error);
        }
    })(req, res, next);
};

async function listUser(req: any, res: any, next: any) {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.send(users);
}

async function getUser(req: any, res: any, next: any) {
    const user = await User.findById(req.params.id, { password: 0, __v: 0 });
    if (!user) {
        res.status(404).send('Usuario no encontrado con el ID: ' + req.params.id);
    }

    res.send(user);
}

async function getUserMe(req: any, res: any, next: any) {
    console.log(req.user);
    const user = await User.findById(req.user._id, { password: 0, __v: 0 });
    if (!user) {
        return res.status(404).send('Usuario no encontrado con el ID: ' + req.user._id);
    }
    res.send(user);
}

async function createUser(req: any, res: any, next: any) {
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send('Ese usuario ya existe');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        role: roles.USER,
        image: req.body.image
    });

    const result = await user.save();

    if (!result) {
        res.status(404).send("A problem occur while creating a user.");
    }

    const jwtToken = user.generateJWT();

    res.status(201).header('Authorization', jwtToken).send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
    // res.send("paso");
}

async function editUser(req: any, res: any, next: any) {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) return res.status(400).send('The user does not exist');

    const result = await User.findByIdAndUpdate(req.user._id, {
        firstName: req.body.firstName,
        image: req.body.image,
        // isAdmin: true,
        lastName: req.body.lastName,
        // role: "ADMIN",
    }, { new: true });

    if (!result) {
        res.status(404).send("A problem occur while creating a user.");
    }

    const jwtToken = user.generateJWT();

    // Sign the JWT token and populate the payload with the user email and id
    const token = jwtToken;
    // Send back the token to the user
    return res.json({ token });
}

async function deleteUser(req: any, res: any, next: any) {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404).send("User does not exist");
    }

    res.status(200).send("User deleted");
}

async function searchUser(req: any, res: any, next: any) {
    console.log(req.params.userName);

    const param =  { $regex: req.params.userName };

    const response = await User.find({$or:[{ firstName: param },{ lastName: param}]}, 'firstName lastName _id').exec();

    res.json(response);
}

// EXPORT ALL FUNCTIONS
export {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getUserMe,
    listUser,
    login,
    signup,
    searchUser,
};