const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const User = require('../models/User');

// Fetching all links for a user
router.get('/links', async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.json({ links });
    } catch (error) {
        res.status(500).send("Some error occurred");
    }
});

// Fetching a single link by ID without updating click count
router.get('/link/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).send("No such link exists.");
        res.json({ link });
    } catch (error) {
        console.error('Error fetching link:', error);
        res.status(500).send('Error fetching link');
    }
});

// Endpoint to handle link clicks and update click count
router.post('/link/:id/click', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).send("No such link exists.");
        link.clickCount += 1;
        await link.save();
        res.json({ message: "Click count updated", clickCount: link.clickCount });
    } catch (error) {
        console.error('Error updating click count:', error);
        res.status(500).send('Error updating click count');
    }
});

// Adding a new link
router.post('/newlink', async (req, res) => {
    try {
        const { title, url, category } = req.body;
        const user = await User.findById(req.user.id);
        const link = new Link({
            user: user._id,
            title,
            url,
            category,
        });
        const savedLink = await link.save();
        res.json({ savedLink });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
});

// Updating a link
router.put('/editlink/:id', async (req, res) => {
    try {
        const { title, url, category } = req.body;
        const updatedFields = {
            title,
            url,
            category,
            lastUpdated: Date.now()
        };
        const updatedLink = await Link.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
        res.json({ updatedLink });
    } catch (error) {
        res.status(500).send("Some error occurred");
    }
});

// Deleting a link
router.delete('/deletelink/:id', async (req, res) => {
    try {
        await Link.findByIdAndDelete(req.params.id);
        res.json({ message: "Link has been deleted successfully" });
    } catch (error) {
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
