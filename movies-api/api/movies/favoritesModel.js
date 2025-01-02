const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieIds: [{ type: Number, required: true }],
});

export default mongoose.model("Favorite", favoriteSchema);
