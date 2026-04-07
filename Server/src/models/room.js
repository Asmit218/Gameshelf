import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomid:{
        type:String,
        required:true,
        unique:true
    },
    playerId:{
        type:String,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    gameName:{
        type:String,
        required:true,
    },
    playersCount:{
        type:Number,
        required:true,
    },
    players:{
        type:Array,
        default:[]
    },
    joinCode:{
        type:Number,
        required:true,
    }
},{timestamps:true});

export default mongoose.model("Room", roomSchema);