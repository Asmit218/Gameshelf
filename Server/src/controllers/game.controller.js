import Game from "../models/game.js";

export const showGames = async (req, res) => {
  try {
    const game = await Game.find().lean();

    if (!game.length) {
      return res.status(404).json({ message: "No Game Found." });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in showGame in game controller");
  }
};

export const getGame = async (req, res) => {
  try {
    const gameId = req.params._id;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "No Games Found." });
    }

    res.status(200).json({
      name: game.name,
      difficulty: game.difficulty,
      image: game.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getGame in game controller");
  }
};

export const createGames = async (req, res) => {
  try {
    const { name, description, rules, difficulty } = req.body;

    const normalizedName = name.toLowerCase().trim();

    const existingGame = await Game.findOne({ name: normalizedName });

    if(existingGame){
        return res.status(400).json({message : "A game already exists with same name"});
    }

    if (!name || !description || !rules || !difficulty) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const fixedDifficulty = difficulty.toLowerCase();
    const availField = ["easy", "medium", "hard"];

    if (!availField.includes(fixedDifficulty)) {
      return res
        .status(400)
        .json({ message: "Difficulty only allowed for easy, medium, hard." });
    }

    const newGame = new Game({
      name,
      description,
      rules,
      difficulty: fixedDifficulty
    });

    await newGame.save();

    res.status(200).json({ message: "Game is Created Sucessfully." ,
        data : newGame
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createGame in game controller");
  }
};

export const updateGames = async (req, res) => {
  try {
    const gameId = req.params._id;

    if (req.body.difficulty) {
      const fixedDifficulty = req.body.difficulty.toLowerCase();

      const availField = ["easy", "medium", "hard"];

      if (!availField.includes(fixedDifficulty)) {
        return res
          .status(400)
          .json({ message: "Difficulty only allowed for easy, medium, hard." });
      }

      req.body.difficulty = fixedDifficulty;
    }

    const updatedGame = await Game.findByIdAndUpdate(gameId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedGame) {
      return res.status(404).json({ message: "No game found by this Id" });
    }

    res.status(200).json({
      message: "Game Updated Successfully",
      data: updatedGame,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in updateGame in game controller");
  }
};

export const deleteGames = async (req, res) => {
  try {
    const gameId = req.params._id;

    const deleteGame = await Game.findByIdAndDelete(gameId);

    if (!deleteGame) {
      return res.status(404).json({ message: "No game found" });
    }

    res.status(200).json({ message: "Game deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deleteGame in game controller");
  }
};