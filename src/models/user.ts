import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    role?: string;
    image?: string;
    generateJWT: () => void;
    fullName: () => string;
    isValidPassword:(password: string) => boolean;
  }

const UserSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: Boolean,
    role: {
        type: String
    },
    image: String
});

UserSchema.pre<IUser>('save', async function(next){
    // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    // your application becomes.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    // Replace the plain text password with the hash and then store it
    this.password = hash;
    // Indicates we're done and moves on to the next middleware
    next();
  });

  UserSchema.methods.isValidPassword = async function(password: string){
    const user = this;
    // Hashes the password sent by the user for login and checks if the hashed password stored in the
    // database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

UserSchema.methods.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
}

UserSchema.methods.generateJWT = function () {
    return jwt.sign({ user: {
        _id: this._id,
        name: this.fullName(),
        email: this.email,
        role: this.role,
        isAdmin: this.isAdmin
    }
    }, 'secret_token', {expiresIn: '1d'});
}

export default mongoose.model<IUser>('user', UserSchema);