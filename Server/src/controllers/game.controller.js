import Game from '../models/game.js';

export const showGames = async(req, res ) => {
    try {
        const game = await Game.find();
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in showGame in game controller");        
    }
}

export const getGames = async(req, res) => {
    try {
        const gameId = req.params._id;
        const game = await Game.findById({gameId});
        res.status(200).json({
            name: game.name,
            difficulty: game.difficulty,
            image: game.imageUrl,
        })
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in getGame in game controller");        
    }
}

export const createGames = async (req, res) => {
    try {

        const {name, description,rules,difficulty} = req.body;        
        
        
        
        
        if (!name || !description || !rules || !difficulty) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const newGame = new Game({
            name,
            description,
            rules,
            difficulty
        })
        
        await newGame.save();

        res.status(200).json({message: "Game is Created Sucessfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in createGame in game controller");
    }
}