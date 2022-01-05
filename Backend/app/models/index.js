const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.song = require("../models/song")(sequelize, Sequelize);
db.playList = require("../models/playlist.model")(sequelize,Sequelize);
db.playListSong = require("../models/PlaylistSong.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


// db.song.belongsToMany(db.playList, {
//   through: "playlistSongs",
//   foreignKey: "songId",
//   otherKey: "playListId"
// })


// db.playList.belongsToMany(db.song, {
//   through: "playlistSongs",
//   foreignKey: "playListId",
//   otherKey: "songId"
// })


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
