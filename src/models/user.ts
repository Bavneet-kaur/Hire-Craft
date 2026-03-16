import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
       name:{
        type: String,
        required: true,
        trim: true,
       },

        email: {
            type: String,
            required: true,
            unique: [true, 'Account already exists with this email!'],
            lowercase: true,
            trim: true,
        },

        password: {
            type:String,
            required: true,
            minlength: 6,
        },

        timeZone: {
            type: String,
            default: "Asia/Kolkata",
        },
    },
    {timestamps: true}
);

export default mongoose.model("users", userSchema);