import Room from "../models/room.js";

export const showRoom = async (req, res) => {
    try {
        const room = await Room.find().lean();

        if(!room.length){
            return res.status(404).json({message : "No Rooms Found."});
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in showRoom in Room controller"); 
    }
}

export const createRoom = async(req, res) => {
    try {
        const {roomid, gameName, playersCount, joinCode} = req.body;

        if(!roomid || !gameName || !playersCount || !joinCode) {
            return res.status(400).json({message : "All Fields are required."});
        }

        if(playersCount <= 0){
            return res.status(400).json({message : "Players Cannt be 0 or below 0."});
        }

        if(joinCode.length > 4 || joinCode.length < 0){
            return res.status(400).json({message : "Joining Code Must be of 4 digits."});
        }

        const newRoom = new Room({
            roomid,
            gameName,
            createdby:req.customData.fullName,
            playersCount,
            joinCode
        })

        const savedRoom = await newRoom.save();
        
        res.status(200).json({message : "Room Created Successfully.",
            data : savedRoom
        });

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in createRoom in Room controller"); 
    }
}

export const deleteRoom = async(req, res) => {
    try {
        const {id} = req.params;

        const room = await Room.findByIdAndDelete(id);

        if(!room){
            return res.status(404).json({message : "Room not Found"});
        }

        res.status(200).json({message : "Room deleted Successfully."})

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in deleteRoom in Room controller"); 
    }
}