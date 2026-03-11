import Match from "../models/match.js";

export const matchHistory = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const matches = await Match.find({
            players: userId
        }).sort({createdAt: -1});
        const history = matches.map(match =>{
            const opponent = Match.player.find(p=>p !== userId);
            const result = Match.winner === userId ? "Win":"Loss";
            return{
                game: Match.game,
                bios:Match.bios,
                opponent:opponent,
                result:result,
                date:Match.createdAt
            }
        })
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch match history"})
    }
}