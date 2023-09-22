const {Router} = require('express');
const {registerUser, loginUser, validateEmail} = require('./user.controllers');
const authenticate = require('../../middelwares/auth.middleware');
const { registerUserValidator, loginValidator } = require('./user.validator');

const router = Router();

router
    .route('/users')
    .post(registerUserValidator, registerUser)
    .get(authenticate, (req, res) => { 

        try {

            console.log(req.user)

            res.json({message: 'your messages here'})

        } catch (error) {

            console.log(error)
        }
    });

router.post('/login', loginValidator, loginUser);

router.post('/email-validation', validateEmail)

module.exports = {
    router,
};