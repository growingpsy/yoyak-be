'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(__dirname, '../config/config.json'))[env];

const User = require('./user');
const Library = require('./library');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); 



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Library = Library;

User.initiate(sequelize);
Library.initiate(sequelize);

User.associate(db);
Library.associate(db);
//User.associate(db);

module.exports = db;