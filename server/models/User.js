const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileViews: {
            type: Number,
            default: 0,
        },
        socialHandles: {
            whatsapp: {
                type: String,
                default: null,
            },
            instagram: {
                type: String,
                default: null,
            },
            x: {
                type: String,
                default: null,
            },
            telegram: {
                type: String,
                default: null,
            },
            snapchat: {
                type: String,
                default: null,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
