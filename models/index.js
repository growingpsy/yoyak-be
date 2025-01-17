'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
//const User = require("./user");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); 

//db.User = User;

//User.initiate(sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//User.associate(db);

module.exports = db;