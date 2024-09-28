const mongoose = require('mongoose');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/soccerTeamDB'; // Database name
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a player schema with unique fields
const playerSchema = new mongoose.Schema({
    whatsID: {
        type: String,
        required: true,
        unique: true // Ensures this field is unique
    },
    name: {
        type: String,
        required: false
    },
    positions: {
        type: [String], // Array of strings for multiple positions
        required: false
    },
    jerseyNumber: {
        type: Number,
        required: false,
    },
    team: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Player model
const Player = mongoose.model('Player', playerSchema);

// Function to add a new player
const addPlayer = async (name, position, jerseyNumber, email, team) => {
    const newPlayer = new Player({ name, position, jerseyNumber, email, team });
    try {
        const savedPlayer = await newPlayer.save();
        console.log('Player added:', savedPlayer);
    } catch (error) {
        console.error('Error adding player:', error.message); // Improved error message
    }
};

const addPlayerSimple = async (whatsID, name) => {
    const newPlayer = new Player({whatsID, name});
    try {
        const savedPlayer = await newPlayer.save();
        console.log('Player added:', savedPlayer);
    } catch (error) {
        console.error('Error adding player:', error.message); // Improved error message
    }
};

// Example usage
addPlayerSimple('234234234', 'Nelly');