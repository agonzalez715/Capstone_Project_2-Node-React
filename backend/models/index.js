// Load env vars and Sequelize
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// 1. Connect to Postgres
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

// 2. Define User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

// 3. Define Review model
const Review = sequelize.define('Review', {
  movieTitle: { type: DataTypes.STRING, allowNull: false },
  reviewText:  { type: DataTypes.TEXT,   allowNull: false }
});

// 4. Associations
Review.belongsTo(User);
User.hasMany(Review);

// 5. Sync DB
sequelize.sync();

module.exports = { sequelize, User, Review };