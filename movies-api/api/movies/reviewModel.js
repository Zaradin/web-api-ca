import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    tmdb_id: { type: Number, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

ReviewSchema.statics.findByMovieId = function (movieId) {
    return this.find({ movieId: movieId });
};

export default mongoose.model("Reviews", ReviewSchema);
