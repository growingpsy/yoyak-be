'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(__dirname, '../config/config.json'))[env];

const User = require('./user');
const Library = require('./library');
const Content = require('./content');
const Comment = require('./comment') 

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Library = Library;
db.Content = Content;
db.Comment = Comment;

User.initiate(sequelize);
Library.initiate(sequelize);
Content.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Library.associate(db);
Content.associate(db);
Comment.associate(db);

module.exports = db;