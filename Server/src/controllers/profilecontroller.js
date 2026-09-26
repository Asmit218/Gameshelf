import Match from "../models/match.js";
import User from "../models/user.js";

//It will return the total games played , total wins and total loss of a player

export const totalWinLoss = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const losses = user.matchesTotal - user.matchesWon;
        res.status(200).json({
            wins: user.matchesWon,
            losses: losses,
            total: user.matchesTotal
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//It was return how many times each game was played by the player 

export const gameCount = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const count = await Match.aggregate([
            {
                $match: {
                    player: playerId
                }
            },
            {
                $group: {
                    _id: "$game",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//It will return how many wins the player has in each game

export const gameWinCount = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const wins = await Match.aggregate([
            {
                $match: {
                    player: playerId
                }
            },
            {
                $group: {
                    _id: "$game",
                    win: {
                        $sum: {
                            $cond: [
                                { $eq: ["$winner", playerId] },
                                1,
                                0
                            ]
                        }
                    },
                    loss: {
                        $sum: {
                            $cond: [
                                { $ne: ["$winner", playerId] },
                                1,
                                0
                            ]
                        }
                    }
                }
            }]);
        res.status(200).json(wins);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//For the matches played section in profile.

export const matchHistory = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const matches = await Match.find({
            player: playerId
        }).sort({ createdAt: -1 });
        const history = await Promise.all(
            matches.map(async (match) => {
            const opponent = match.player.find(p => p !== playerId);
            const opponentUser = await User.findOne({ playerId: opponent });
            const result = match.winner === playerId ? "Win" : "Loss";
            return {
                game: match.game,
                bios: match.bios,
                opponent: opponent,
                opponentUser: opponentUser?.userName || "unknown",
                result: result,
                date: match.createdAt
            }
        }))
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//For level functionality

export const levelxp = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const level = Math.floor(user.xp / 100) + 1;
        const remainder = user.xp % 100;
        res.status(200).json({
            level: level,
            xp: remainder
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//For Bios count in profile page

export const biosCount = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({ playerId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bios = user.bios;
        const won = await Match.aggregate([
            {
                $match: {
                    winner: playerId
                }
            },
            {
                $group: {
                    _id: null,
                    biosWon: { $sum: "$bios" },
                }
            }
        ])
        const lost = await Match.aggregate([
            {
                $match: {
                    player: playerId,
                    winner: { $ne: user._id }
                }
            },
            {
                $group: {
                    _id: null,
                    biosLost: { $sum: "$bios" },
                }
            }
        ])
        res.status(200).json({
            bios: bios,
            biosWonCount: won[0]?.biosWon || 0,
            biosLostCount: lost[0]?.biosLost || 0
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const otherStats = async(req,res) => {
    try {
        const playerId = req.params.playerId;
        const user = await User.findOne({playerId});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const friendCount = user.friends.length;
        res.status(200).json({
            bestRank: user.bestRank,
            friend: friendCount
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
