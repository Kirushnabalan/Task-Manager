const User= require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT TOken
const generateToken = (userId) => {
    return jwt.sign({ id:userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try{
        const { name, email, password, profileImageUrl,adminInviteToken } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //Determine user role ;Admin if correct token is provided,otherwise member
        let role = "member";
        if (adminInviteToken && 
            adminInviteToken === process.env.ADMIN_INVITE_TOKEN
        ) {
            role = "admin";
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImage: profileImageUrl || null,
            role,
        });

        //Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
            token: generateToken(user._id),
        });
    }catch (error) {
        return res.status(500).json({ message: "Server error",error: error.message });
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
        try{
        
    }catch (error) {
        return res.status(500).json({ message: "Server error",error: error.message });
    }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private {Requires JWT}
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private {Requires JWT}
const updateUserProfile = async (req, res) => {
    try{
        
    }catch (error) {
        return res.status(500).json({ message: "Server error",error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    generateToken,
};