module.exports = (sequelize, Sequelize) => {
    const Playlist = sequelize.define("playlists", {
      Name: {
        type: Sequelize.STRING
      }
    });
  
    return Playlist;
  };
  
