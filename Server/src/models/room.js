import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomid:{
        type:String,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    players:{
        type:Array,
        default:[]
    },
    password:{
        type:String,
    }
},{timestamps:true});

export default mongoose.model("Room", roomSchema);