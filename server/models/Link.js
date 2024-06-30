const mongoose = require('mongoose');

const linkSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['social', 'other'],
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
