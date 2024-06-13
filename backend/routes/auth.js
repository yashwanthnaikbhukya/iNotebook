const express = require('express');
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'yashwanthnaikbhukya';
var fetchuser = require('../middleware/fetchuser');


//ROUTE 1: create a user using POST "/api/auth/createuser" -> No Login req
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 chars').isLength({ min: 5 })
] , async (req, res)=>{

    //validating inputs
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() });
    }
    try{
        //check whether user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        //creating new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
            });

            const data = {
                user:{ id: user.id}
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authtoken});
    }catch(error){
          console.error(error);
          res.status(500).json({ error: 'Server error' });
    }
});

//ROUTE 2: Authenticate a user using POST "/api/auth/login" -> Login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
] , async (req, res)=>{

    //validating inputs
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please check your login credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please check your login credentials" })
        }

        const data = {
            user:{ id: user.id}
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//ROUTE 3: Get login id user details using POST "/api/auth/getuser" -> Login
router.post('/getuser', fetchuser, async (req, res)=>{

    try {
        var userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router