import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Buyer", "Seller", "Admin"],
        default: "Buyer"
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("User", UserSchema)