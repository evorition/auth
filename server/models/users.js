const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
        },
        message: "Invalid email format",
    },
    passwordHash: String,
    status: {
        type: String,
        default: "active",
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
});

mongoose.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

module.exports = mongoose.model("User", userSchema);
