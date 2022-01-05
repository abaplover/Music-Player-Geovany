
models = require("../models/");

module.exports = (sequelize, Sequelize) => {
    const PlaylistSong = sequelize.define("PlaylistSong", {
      PlaylistId: {
        type: Sequelize.INTEGER,
      },
      SongId:{
        type: Sequelize.INTEGER
      }
    });

  PlaylistSong.associate = models =>{
    PlaylistSong.belongsTo(models.Song, {
      foreignKey: 'songId'
    });
  }

 PlaylistSong.associate = models =>{
    PlaylistSong.belongsTo(models.Playlist, {
      foreignKey: 'playlistId'
    });
  }
  

  return PlaylistSong;
};