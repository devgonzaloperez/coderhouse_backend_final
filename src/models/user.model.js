import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatarURL: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true //Sirve para que MongoDB cree automáticamente un campo en el que se informe cuando se creó el registro y cuando se modificó por última vez.
});

export const UserModel = mongoose.model("user", userSchema);