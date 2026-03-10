import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "",
    },
    matches: {
        type: Number,
        default: 0,
    },
    matchesWon: {
        type: Number,
        default: 0,
    },
    matchesLost: {
        type: Number,
        default: 0,
    },
    friends: {
        type: Array,
        default: [],
    },
    bgPhoto: {
        type: String,
        default: "",
    },
});

export default mongoose.model("User", userSchema);