const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Family = require('./Family')(sequelize, DataTypes);
const Member = require('./Member')(sequelize, DataTypes);

// Set up associations
if (Family.associate) Family.associate({ Member });
if (Member.associate) Member.associate({ Family });

module.exports = { sequelize, Family, Member };