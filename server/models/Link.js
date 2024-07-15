const mongoose = require('mongoose');

const linkSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        social: {
            type: Boolean,
            required: true,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
