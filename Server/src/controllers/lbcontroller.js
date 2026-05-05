import User from "../models/user.js";

export const getLeaderboard = async (req, res) => {
    try {
        const { type = "wins", limit = 20 } = req.query;
        const currentUser = await User.findOne({playerId: req.user.playerId});

        if (!currentUser) {
            return res.status(404).json({message: "User not found"});
        }

        const fieldMap = {
            wins: "matchesWon",
            bios: "bios",
        };
        if (!fieldMap[type]) {
            return res.status(400).json({ message: "invalid leaderboard type" });
        }
        const sortOption = {};
        const dbField = fieldMap[type];
        sortOption[dbField] = -1;
        const users = await User.find({})
            .select("playerId userName matchesWon bios xp")
            .sort(sortOption)
            .limit(Number(limit))

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            playerId: user.playerId,
            userName: user.userName,
            wins: user.matchesWon,
            bios: user.bios,
            xp: user.xp,
        }));

        const higherCount = await User.countDocuments({
            [dbField]: { $gt: currentUser[dbField] },
        });

        const userRank = higherCount + 1;

        res.json({
            leaderboard,
            currentUser: {
                rank: userRank,
                playerId: currentUser.playerId,
                userName: currentUser.userName,
                wins: currentUser.matchesWon,
                bios: currentUser.bios,
                xp: currentUser.xp,
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};