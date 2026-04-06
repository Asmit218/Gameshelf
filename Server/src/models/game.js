import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    imageUrl: {
        type: String,
        default:"",
    },
    rules: {
        type: String,
        required: true,
    },
},{timestamps: true});

export default mongoose.model('Game', gameSchema);