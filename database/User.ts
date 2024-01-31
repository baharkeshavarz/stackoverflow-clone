import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    email:  {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    image: String,
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", UserSchema)