const {check, validationResult} = require('express-validator');
const { validateResult } = require('../../middelwares/validator.middelware');

const registerUserValidator = [
    check('firstname', 'error with firstname')
        .exists()
        .withMessage("the property fisrtname are not included")
        .notEmpty()
        .withMessage("firstname cant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .isLength({min: 2, max:50})
        .withMessage("the lenght for this property must be min 2 and max 50")
        .matches(/^[a-zA-Z\s]/)
        .withMessage("fistname can only have letters"),
    check('lastname', 'error with lastname ')
        .exists()
        .withMessage("the property  lastname are not included")
        .notEmpty()
        .withMessage(" lastname cant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .isLength({min: 2, max:50})
        .withMessage("the lenght for this property must be min 2 and max 50")
        .matches(/^[a-zA-Z\s]/)
        .withMessage("lastname can only have letters"),
    check('email', 'conflict with the email')
        .exists()
        .withMessage("the property  email are not included")
        .notEmpty()
        .withMessage(" emailcant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .isLength({min: 2, max:50})
        .withMessage("the lenght for this property must be min 2 and max 50"),
    check('password', 'error with password')
        .exists()
        .withMessage("the property  password are not included")
        .notEmpty()
        .withMessage(" password cant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%-^&*]{8,}$/)
        .withMessage("password error"),
    validateResult,
];

const loginValidator = [
    check('email', 'conflict with the email')
        .exists()
        .withMessage("the property  email are not included")
        .notEmpty()
        .withMessage(" emailcant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .isLength({min: 2, max:50})
        .withMessage("the lenght for this property must be min 2 and max 50"),
    check('password', 'error with password')
        .exists()
        .withMessage("the property  password are not included")
        .notEmpty()
        .withMessage(" password cant empty")
        .isString()
        .withMessage("the type for this property must be a string")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-^&*])[A-Za-z\d!@#$%-^&*]{8,}$/)
        .withMessage("password can only have letters"),
    validateResult,
];
module.exports = {
    registerUserValidator,
    loginValidator
}