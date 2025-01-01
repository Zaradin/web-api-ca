import express from "express";
import User from "./userModel";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { authenticate } from "../../authenticate/index";

const router = express.Router(); // eslint-disable-line

// Get all users
// eslint-disable
router.get("/", async (req, res) => {
    // eslint-disable-line
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post(
    "/",
    asyncHandler(async (req, res) => {
        try {
            // Check if either email or username and password are present in the body
            if ((!req.body.email && !req.body.username) || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    msg: "Username/Email and password are required.",
                });
            }

            if (req.query.action === "register") {
                await registerUser(req, res);
            } else {
                await authenticateUser(req, res);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                msg: "Internal server error.",
            });
        }
    })
);

// Update a user
router.put("/:id", async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne(
        {
            _id: req.params.id,
        },
        req.body
    );
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: "User Updated Sucessfully" });
    } else {
        res.status(404).json({ code: 404, msg: "Unable to Update User" });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: "User successfully created." });
}

async function authenticateUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({
            success: false,
            msg: "Authentication failed. User not found.",
        });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ success: true, token: "BEARER " + token });
    } else {
        res.status(401).json({ success: false, msg: "Wrong password." });
    }
}

router.get(
    "/reviews",
    authenticate,
    asyncHandler(async (req, res) => {
        const userId = req.user._id;

        try {
            const reviews = await ReviewSchema.find({ user: userId }).populate(
                "tmdb_id",
                "title"
            );

            if (reviews.length === 0) {
                return res.status(404).json({ message: "No reviews found" });
            }

            res.status(200).json(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
);

export default router;
