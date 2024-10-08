const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userdetails = require("../middleware/userdetails");

const JWT_SECRET = process.env.JWT_SECRET;

// Register a user using POST
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate the salt
    const safepassword = await bcrypt.hash(req.body.password, salt); // Encrypting the password with the salt
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: safepassword,
    });
    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    res
      .status(201)
      .json({ message: "User created!", data: user, token: token });
  } catch (err) {
    res.status(400).json({ message: "Failed to create the user.", error: err });
  }
});

// Login a user using POST
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ message: "User does not exist" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ message: "Invalid username or password" });

    const data = {
      user: {
        id: user._id, // user._id is the id of the user
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ token: token, data: user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route to fetch a single user by ObjectId
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found", exists: false }); // include 'exists' property
    res.status(200).json({ message: "User found", data: user, exists: true }); // include 'exists' property
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred during fetching the user" });
  }
});

// route to get details of a user with username when publcly accesed 
router.get("/getuser/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user){
            return res.status(200).json({ message: "User not found", exists: false });
        }

        const currentTime = new Date();
        const thirtySeconds = 30 * 1000;

        if (!user.lastView || (currentTime - new Date(user.lastView)) > thirtySeconds) {
            user.profileViews += 1;
            user.lastView = currentTime;
            await user.save();
        }

        res.status(200).json({ message: "User found", data: user, exists: true });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during fetching the user" });
    }
});


router.get("/username/:username", async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username: username }); // find one user by username
  
      if (!user) {
        return res.status(200).json({ message: "User not found", available: true });
      } else {
        return res.status(200).json({ message: "User found", data: user, available: false });
      }
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      return res.status(500).json({ message: "An error occurred during fetching the user" });
    }
  });
  

// Get user details using Token with POST
router.get("/userdetails", userdetails, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).send("Some Error occurred");
  }
});

// Route to count the number of users registered
router.get("/usercount", async (req, res) => {
  try {
    const usercount = await User.countDocuments();
    res.status(200).json({ usercount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during counting the users" });
  }
});

// Update social media accounts using PUT
router.put("/updatesocial", userdetails, async (req, res) => {
  const { whatsapp, instagram, x, telegram, snapchat } = req.body.socialHandles;
  const userId = req.user.id; // Assuming you have user ID available in req.user

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.socialHandles.whatsapp = whatsapp;
    user.socialHandles.instagram = instagram;
    user.socialHandles.x = x;
    user.socialHandles.telegram = telegram;
    user.socialHandles.snapchat = snapchat;

    await user.save();
    res.status(200).json({
      message: "Social handles updated successfully",
      socialHandles: user.socialHandles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//   route to update userprofile the fields are name username and password
router.put("/updateprofile", userdetails, async (req, res) => {
  const { name, username, password } = req.body;
  const userId = req.user.id; // Assuming req.user is set by userdetails middleware

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser.id !== userId) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // If password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate the salt
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Update user details
    user.name = name || user.name;
    user.username = username || user.username;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
