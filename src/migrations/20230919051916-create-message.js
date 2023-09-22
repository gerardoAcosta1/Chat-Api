'use strict';
/** @type {import('sequelize-cli').Migration} */

//npx sequelize-cli model:generate --name Participant --attributes userId:integer,conversationId:integer
//npx sequelize-cli model:generate --name Participant --atributes userId:integer,conversationId:integer 
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING,
        allowNull:false
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Conversations',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};