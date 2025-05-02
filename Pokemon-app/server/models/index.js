const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');

// Define associations
User.hasMany(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Team.belongsTo(User, {
  foreignKey: 'user_id',
});

Team.hasMany(Pokemon, {
  foreignKey: 'team_id',
});

Pokemon.belongsTo(Team, {
  foreignKey: 'team_id',
});

module.exports = { User, Pokemon, Team };