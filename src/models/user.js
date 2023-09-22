'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const { transporter } = require('../utils/mailer');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {foreignKey:'senderId'});
      User.hasMany(models.Conversation, {foreignKey: 'createdBy'});
      User.belongsToMany(models.Conversation, {through:'Participant'});
    
    }'https://us05web.zoom.us/j/86432910994?pwd=uONGYyAl6y2mijNsgePnDXpmRNnbVe.1'
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
      },
      afterCreate: (user, options) => {
        
        
        const {email, firstname, lastname} = user;
        const token = jwt.sign({email}, process.env.JWT_EMAIL_SECRET, {
          algorithm: 'HS512',
          expiresIn: '2d'
        });
        transporter.sendMail(
          {
              to: email,
              subject: 'probando',
              html: `<h3>Hi ${firstname}, ${lastname} You need to make click on the next <a href="http://localhost:5173/auth/email-validation?token=${token}">link</a> to verify your account<h3>`
          }
      )
      }
    }, 
    
  });
  return User;
};