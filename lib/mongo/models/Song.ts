import mongoose, { Schema } from "mongoose";

// A field is only required if you add required: true to its definition.
const SongSchema = new mongoose.Schema({
    author: String,
    title: String,
    song_path: String,
    image_path: String,
    user_id: [{
       type: Schema.Types.ObjectId,
       ref: "User"
    }]
}, {timestamps: true});


export default mongoose.models.Song || mongoose.model("Song", SongSchema)