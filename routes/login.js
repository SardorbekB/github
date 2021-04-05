const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    res.render('login');
});

router.post('/', async(req, res) => {
    const {error} = validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send('Email yoki parol xato');
    }

    let isValidPassword = await bcrypt.compare(user.password, req.body.password);
    if(isValidPassword) {
        return res.status(400).send('Email yoki parol xato');
    }

    res.send(true);
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const result = schema.validate({
        email: user.email,
        password: user.password
    });

    return result;
}

module.exports = router;