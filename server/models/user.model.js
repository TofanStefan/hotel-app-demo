const Sequelize=require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
       id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
       },
       first_name: {
        type: Sequelize.STRING,
        allowNull: false
       },
       last_name: {
        type: Sequelize.STRING,
        allowNull: false
       },
       email: {
        type: Sequelize.STRING,
        allowNull: false
       },
       password: {
        type: Sequelize.STRING,
        allowNull: false
       },
       gender: {
        type: Sequelize.STRING,
        allowNull: true
       },
       age: {
        type: Sequelize.INTEGER,
        allowNull: true
       },
       profile_photo: {
        type: Sequelize.STRING,
        defaultValue:"uploads\\no_image.jpg",
        allowNull: true
       }
    });
    return User;
};
