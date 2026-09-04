import Room from "../models/room.js";
import { generateRoomId } from "../utils/roomid.js";

export const showRoom = async (req, res) => {
  try {
    const room = await Room.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in showRoom in Room controller");
  }
};

export const showMyRoom = async (req, res) => {
  try {
    const playerId = req.user.playerId;

    const room = await Room.find({ playerId: playerId }).sort({ createdAt: -1 });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in showMyRoom in Room controller");
  }
};

export const createRoom = async (req, res) => {
  try {
    const { gameName, playersCount, joinCode } = req.body;

    if (!gameName || !playersCount || !joinCode) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    if (playersCount <= 0) {
      return res
        .status(400)
        .json({ message: "Players Cannt be 0 or below 0." });
    }

    if (joinCode.toString().length !== 4) {
      return res.status(400).json({ message: "Join Code Must be 4 digits." });
    }

    const roomid = generateRoomId();

    const newRoom = new Room({
      roomid,
      playerId: req.user.playerId,
      gameName,
      createdby: req.user.userName,
      playersCount,
      joinCode,
      players: [req.user.playerId],
    });

    const savedRoom = await newRoom.save();

    res
      .status(200)
      .json({ message: "Room Created Successfully.", data: savedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createRoom in Room controller");
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomid } = req.params;
    const playerId = req.user.playerId;
    const { joinCode } = req.body;

    if (!joinCode) {
      return res.status(400).json({ message: "Join code required" });
    }

    const room = await Room.findOne({ roomid });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (String(room.joinCode) !== String(joinCode).trim()) {
      return res.status(400).json({ message: "Invalid join code" });
    }

    const updatedRoom = await Room.findOneAndUpdate(
      {
        roomid,
        players: { $ne: playerId },
        $expr: { $lt: [{ $size: "$players" }, "$playersCount"] },
      },
      {
        $addToSet: { players: playerId },
      },
      { returnDocument: 'after' },
    );

    if (!updatedRoom) {
      const latestRoom = await Room.findOne({ roomid });

      if (!latestRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

      if (latestRoom.players.includes(playerId)) {
        return res.status(409).json({ message: "Already joined" });
      }

      if (latestRoom.players.length >= latestRoom.playersCount) {
        return res.status(409).json({ message: "Room full" });
      }

      return res.status(400).json({ message: "Join failed" });
    }

    res.status(200).json({
      message: "Joined successfully",
      data: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const playerId = req.user.playerId;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.playerId !== playerId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const myRoom = await Room.findByIdAndDelete(id);

    res.status(200).json({ message: "Room deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deleteRoom in Room controller");
  }
};
