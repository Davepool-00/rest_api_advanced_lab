const express = require("express"); 
const router = express.Router(); 
const User = require("../models/user"); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs"); 
// REGISTER 
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // normalize email (VERY IMPORTANT)
        const cleanEmail = email.trim().toLowerCase();

        // check if user already exists
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create user (password will be hashed by your schema pre-save hook)
        const user = new User({
            email: cleanEmail,
            password
        });

        await user.save(); // 🔥 THIS WAS MISSING

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// LOGIN 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        // 2. Check user exists
        const user = await User.findOne({
    email: email.trim().toLowerCase()
});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // 3. Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong password" });
        }

        // 4. Check JWT secret exists
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET missing in .env" });
        }

        // 5. Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;