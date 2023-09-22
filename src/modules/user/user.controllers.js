const {User} = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//############## Register User#################################

const registerUser = async (req, res) =>{

    try {
        
        const newUser = req.body

        await User.create(newUser)

        res.status(200).end();
        
    } catch (error) {
   
        res.status(400).json(error)
    }
}

//################## Login User #################################

const loginUser = async (req, res) => {

    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}})

        if(!user){

           return res.status(400).json({
                error: 'invalid mail',
                message: 'you need register before login'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){

            return res.status(400).json({
                error: 'invalid password',
                message: 'the password does not match with this user'
            });
        }

        const copyUser = {...user.dataValues};

        delete copyUser.password;

        const token = await jwt.sign(copyUser, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn:"1h"
        });

        copyUser.token = token;

        res.json(copyUser)
        
    } catch (error) {

        console.log(error)

        res.status(400).json(error)
    }
}

//################## Validate Email #################################

const validateEmail = async (req, res) => {

    try {

        const {token} = req.body;

        if(!token){

            return res.status(404).json({message: 'not found token'})
        }

        const {email} = jwt.verify(token, process.env.JWT_EMAIL_SECRET,{
            algorithms: 'HS512'
        });

        const user = await User.findOne({where:{email}})

        if(user.validEmail){

            return res.status(400).json({

                message: 'the email was used'
            });
        }

        user.validEmail = true;

        user.save();

        res.status(200).json({

            message: 'email verify succesfully'
        });

    } catch (error) {

        res.status(400).json(error)
    }
}

//################## Exports ################################3

module.exports = {

    registerUser,
    loginUser,
    validateEmail

}

