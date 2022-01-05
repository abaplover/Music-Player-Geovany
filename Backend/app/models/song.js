module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("songs", {
      Name: {
        type: Sequelize.STRING
      },
      Genre: {
        type: Sequelize.STRING
      },
      Artist: {
        type: Sequelize.STRING
      },
      Duration: {
        type: Sequelize.INTEGER
      },
      ReleaseDate: {
        type: Sequelize.DATEONLY
      },
      FileLocation: {
        type: Sequelize.STRING
      },
      IsYoutube: {
        type: Sequelize.BOOLEAN
      },
      YoutubeUrl: {
        type: Sequelize.STRING
      },
      isBlocked: {
          type: Sequelize.BOOLEAN
      },
      SongImg: {
        type: Sequelize.STRING
      }
    });
  
    return Song;
  };
  