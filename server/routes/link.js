const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const userdetails = require('../middleware/userdetails');

// Fetching all links
router.get('/links', async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json({ links });
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ message: 'Failed to fetch user links' });
    }
});

//fetching all links of a single user
router.get('/links/:username', async (req, res) => {
    try {
        const links = await Link.find({ username: req.params.username });
        res.status(200).json({ links });
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ message: 'Failed to fetch user links' });
    }
});

// Fetching a single link by ID without updating click count
router.get('/:id', async (req, res) => {
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
router.post('/click/:id', async (req, res) => {
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
router.post('/newlink', userdetails, async (req, res) => {
    try {
        const { title, url, social } = req.body;
        const link = new Link({
            username: req.user.username,
            title,
            url,
            social,
        });
        const savedLink = await link.save();
        res.json({ savedLink });
    } catch (error) {
        console.log(error);
        res.status(500).json("Some error occurred");
    }
});


//updating link order
// Assuming you have an Express app setup

router.put('/updateOrder', async (req, res) => {
    const { links } = req.body;

    try {
        for (let i = 0; i < links.length; i++) {
            await Link.findByIdAndUpdate(links[i]._id, { order: i });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating link order', error });
    }
});


// Updating a link
router.put('/edit/:id', userdetails, async (req, res) => {
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
router.delete('/delete/:id', userdetails, async (req, res) => {
    try {
        await Link.findByIdAndDelete(req.params.id);
        res.json({ message: "Link has been deleted successfully" });
    } catch (error) {
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
