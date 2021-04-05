const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {User} = require('../models/user');

router.get('/', async(req, res) => {
    res.send('index');
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('Bu foydalanuvchi bazada mavjud');
    }

    res.redirect('register');
})

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().required()
    });

    const result = schema.validate({
        email: user.email
    });
    return result;
}

module.exports = router;