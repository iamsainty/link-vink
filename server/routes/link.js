const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const userdetails = require("../middleware/userdetails");
const mongoose = require('mongoose');

// Fetching all links along with link count and total click count
router.get("/links", async (req, res) => {
  try {
    const links = await Link.find();
    const linkcount = links.length;
    const clickcount = links.reduce((acc, link) => acc + link.clickCount, 0);
    res.status(200).json({ links, linkcount, clickcount });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Failed to fetch links" });
  }
});

// Fetching all links of a single user
// Route to get links by user ID
router.get("/userlinks/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from route parameters

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Use user ID to find links
    const links = await Link.find({ user: userId });
    const linkcount = links.length;
    const clickcount = links.reduce((acc, link) => acc + link.clickCount, 0); // Calculate total click count

    res.status(200).json({ links, linkcount, clickcount });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Failed to fetch user links" });
  }
});

// Fetching a single link by ID without updating click count
router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).send("No such link exists.");
    res.json({ link });
  } catch (error) {
    console.error("Error fetching link:", error);
    res.status(500).send("Error fetching link");
  }
});

// Endpoint to handle link clicks and update click count
router.put("/click/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).send("No such link exists.");
    link.clickCount += 1;
    await link.save();
    res.json({ message: "Click count updated", clickCount: link.clickCount });
  } catch (error) {
    console.error("Error updating click count:", error);
    res.status(500).send("Error updating click count");
  }
});

// Adding a new link
router.post("/newlink", userdetails, async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = new Link({
      user: req.user.id,
      title,
      url,
    });
    const savedLink = await link.save();
    res.status(201).json({ message: "Link created successfully", link: savedLink });
  } catch (error) {
    console.log(error);
    res.status(500).json("Some error occurred");
  }
});

// Updating a link
router.put("/edit/:id", userdetails, async (req, res) => {
  try {
    const { title, url } = req.body;
    const updatedFields = {
      title,
      url,
      lastUpdated: Date.now(),
    };
    const updatedLink = await Link.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );
    res.json({ updatedLink });
  } catch (error) {
    res.status(500).send("Some error occurred");
  }
});

// Deleting a link
router.delete("/delete/:id", userdetails, async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: "Link has been deleted successfully" });
  } catch (error) {
    res.status(500).send("Some error occurred");
  }
});

module.exports = router;
