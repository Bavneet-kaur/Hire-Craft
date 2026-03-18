import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); //auto delete the expired tokens
export default mongoose.model("blacklist", blacklistSchema);