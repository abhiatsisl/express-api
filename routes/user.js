const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
// create user
router.post('/signup', [
    body('email', 'Please enter correct email is').isEmail(),
    body('email').custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('Email id already exist');
            }
        });
    }),
    body('password', 'Please enter password with minmum 5 character').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send('hello');
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        }).then(user => res.json(user));
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
});
router.get('/', async (req, res) => {
    return User.find({}, { "name": true, "email": true, "date": true }).then(user => {
        res.json({ "status": 200, "message": "user list found", "data": user });
    });
});
router.get('/:id', async (req, res) => {
    var id = req.params.id;
    return User.findOne({ _id: id }, { "name": true, "email": true, "date": true }).then(user => {
        res.json({ "status": 200, "message": "user list found", "data": user });
    });
});

/*update user data*/
router.post('/update/:id', [
    body('email', 'Please enter correct email is').isEmail(),
    body('password', 'Please enter password with minmum 5 character').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
], async (req, res) => {
    var id = req.params.id;
    return User.updateOne({ _id: id }, { $set: { "name": req.body.name, "email": req.body.email } }).then(user => {
        res.json({ "status": 200, "message": "data updated successfully" });
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    User.deleteOne({ _id: id }, function (err, results) {
    });
    return res.json({ "status": 200, "message": "user deleted successfully" });
});

router.post('/login', [
    body('email', 'Please enter correct email is').isEmail(),
    body('password', 'Please enter password with minimum 5 character').isLength({ min: 5 })
], async (req, res) => {
    // console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // console.log(salt);
        return User.find({ "email": req.body.email} , { "password": secPass}, { "name": true, "email": true, "date": true }).then(user => {
            res.json({ "status": 200, "message": "Login sucess", "data": user });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
});
module.exports = router