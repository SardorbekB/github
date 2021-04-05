const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    res.render('register');
});

router.post('/', async(req, res) => {
    const {error} = validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('Bu foydalanuvchi bazada mavjud');
    }

    user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()
        .then(() => {
            res.send("Muvaffaqqiyatli ro`yhatdan o`tdingiz...");
        })
        .catch((err) => {
            res.send("Ro`yhatdan o`tishda xatolik yuz berdi");
        });
});


function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const result = schema.validate({
        userName: user.userName,
        email: user.email,
        password: user.password
    });

    return result;
}

module.exports  = router;