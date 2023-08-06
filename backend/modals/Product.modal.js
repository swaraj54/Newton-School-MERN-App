import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Product", ProductSchema)