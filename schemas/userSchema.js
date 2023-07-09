import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    purchasedProducts: { type: Array, required: false },
});

export const User = mongoose.model("User", userSchema);
