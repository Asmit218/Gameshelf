import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    game:{
        type: String,
        required : true
    },
    winner:{
        type: String,
        required: true
    },
    player:{
        type: Array,
        required: []
    },
    bios:{
        type: Number,
        required : true
    }
},{timestamps:true});

export default mongoose.model("Match", matchSchema);