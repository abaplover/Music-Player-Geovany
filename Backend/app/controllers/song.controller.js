const db = require("../models");
const config = require("../config/auth.config");

const Song = db.song;

exports.createSong = (req, res) => {
    if(!req.body.Title){
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    var fullUrl = req.protocol + '://';
    Song.create({
        Title: req.body.Title,
        Genre: req.body.Genre,
        Artist: req.body.Artist,
        Duration: req.body.Duration,
        ReleaseDate: req.body.ReleaseDate,
        Src: fullUrl + req.files['Src'][0].path,
        IsYoutube: req.body.IsYoutube,
        YoutubeUrl: req.body.YoutubeUrl,
        isBlocked: req.body.isBlocked,
        SongImg: fullUrl + req.files['SongImg'][0].path,
    }).then(data => {
        res.send("Song created successfully!");
    })
}

exports.getAllSongs = (req, res) => {
    Song.findAll ()
      .then(song => {
        if (!song) {
          return res.status(404).send({ message: "Song Not found." });
        }
          res.status(200).send(song);
        })      
        
      
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

    

  };
  
  exports.getSong = (req, res) => {
    const id = req.params.id;
    Song.findByPk(id)
    .then(data => {
        if (data) {
         res.send(data);    
        }
        else{
         res.status(404).send({
             message: "Song not found"
         })
        }
        
    });
}

    exports.updateSong = (req, res) => {
        const id = req.params.id;
        
        Song.update(req.body, {
            where: {id: id}
        })
        .then( num => {
            if (num == 1) {
                res.send({
                    message: "Song updated successfully"
                })
            }else{
                res.send({
                    message: "Cannot update song with id=${id}"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "There has been an error with id" + id
            });
        } )
    }

    exports.deleteSong = (req, res) => {
        const id = req.params.id;
        
        Song.destroy({
            where: {id: id}
        })
        .then( num => {
            if (num == 1) {
                res.send({
                    message: "Song deleted successfully"
                })
            }else{
                res.send({
                    message: "Cannot delete song with id=${id}"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "There has been an error with id" + id
            });
        } )
    }

