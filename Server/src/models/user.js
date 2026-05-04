import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    playerId:{
        type:String,
        required:true
    },
    userName: {
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
    matchesTotal: {
        type: Number,
        default: 0,
    },
    matchesWon: {
        type: Number,
        default: 0,
    },
    bios:{
        type:Number,
        default: 1000
    },
    xp: {
        type: Number,
        default: 0
    },
    friends: {
        type: Array,
        default: [],
    },
    bgPhoto: {
        type: String,
        default: "",
    },
},{timestamps:true}
);

export default mongoose.model("User", userSchema);