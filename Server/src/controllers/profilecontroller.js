import Match from "../models/match.js";

export const matchHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const matches = await Match.find({
            players: userId
        }).sort({ createdAt: -1 });
        const history = matches.map(match => {
            const opponent = Match.player.find(p => p !== userId);
            const result = Match.winner === userId ? "Win" : "Loss";
            return {
                game: Match.game,
                bios: Match.bios,
                opponent: opponent,
                result: result,
                date: Match.createdAt
            }
        })
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const gameWinCount = async (req, res) => {
    try {
        const userId = req.params.userId;
        const wins = await Match.aggregate([
        {
            $match: { 
                winner: userId 
            }
        },
        {
            $group: {
                _id: "$game",
                wins: { $sum: 1 }
            }
        }]);
        res.status(200).json(wins);
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const gameCount = async (req,res) => {
    try {
        const userId = req.params.userId;
        const count = await Match.aggregate([
            {
                $match: {
                    player: userId
                }
            },
            {
                $group: {
                    _id: "$game",
                    count: {$sum:1}
                }
            }
        ]);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({message:error})
    }
};

export const totalWinLoss = async(req,res) => {
    try {
        const userId = req.params.userId;
        const total = await Match.countDocuments({
            players: userId
        });
        const wins = await Match.countDocuments({
            winners : userId
        });
        const loss = await Match.countDocuments({
            player: userId,
            winner: {$ne: userId}
        });
        res.status(200).json({
            totalMatches,
            wins,
            loss
        });
    } catch (error) {
        res.status(500).json({message:error})
    }
}