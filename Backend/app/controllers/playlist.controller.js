const db = require("../models");
const config = require("../config/auth.config");
const e = require("express");

const Playlist = db.playList;
const Song = db.song;
const PlaylistSong = db.playListSong


exports.create = (req, res) => {
    if(!req.body.Name){
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    Playlist.create({
        Name: req.body.Name
    }).then(data => {
        res.send("Playlist created successfully!");
    })
}

exports.getAll = (req, res) => {
    Playlist.findAll ()
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({ message: "Play;ist Not found." });
        }
          res.status(200).send(playlist);
        })      
        
      
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

    

  };
  
  exports.getPlaylist = (req, res) => {
    const id = req.params.id;
    Playlist.findByPk(id)
    .then(data => {
        if (data) {
         res.send(data);    
        }
        else{
         res.status(404).send({
             message: "Playlist not found"
         })
        }
        
    });
}

    exports.update = (req, res) => {
        const id = req.params.id;
        
        Playlist.update(req.body, {
            where: {id: id}
        })
        .then( num => {
            if (num == 1) {
                res.send({
                    message: "Playlist updated successfully"
                })
            }else{
                res.send({
                    message: "Cannot update playlist with id=${id}"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "There has been an error with id" + id
            });
        } )
    }

    exports.delete = (req, res) => {
        const id = req.params.id;
        
        Playlist.destroy({
            where: {id: id}
        })
        .then( num => {
            if (num == 1) {
                res.send({
                    message: "Playlist deleted successfully"
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

    exports.addPlaylistSong = (req, res) => {
        const songId = req.body.SongId;

       return Song.findByPk(songId)
        .then(song => {
            if (!song) {
                res.status(404).send({
                    message: "SongId not found"
                })
                return null;
            }
        

        const playlistId = req.body.PlaylistId;
        return  Playlist.findByPk(playlistId)
        .then(playlist => {
            if (!playlist) {
                res.status(404).send({
                    message: "PlaylistId not found"
                })
                return null;
            }

            PlaylistSong.create( {
                PlaylistId: playlistId,
                SongId: songId
            });
            res.status(200).send({
                message: "Song added to playlist"
            })
            return playlist;
        })

    })
    }

    exports.deleteSongPlaylist = (req, res) => {

        const SongId = req.body.SongId;
        const PlaylistId = req.body.PlaylistId;

        console.log(req.body);
        
        PlaylistSong.destroy({
            where: { SongId: SongId, PlaylistId: PlaylistId}
        })
        .then( num => {
            if (num == 1) {
                res.send({
                    message: "Song deleted from playlist successfully"
                })
            }else{
                res.send({
                    message: "Cannot delete song with id= ${id}"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "There has been an error with id: " + req.body
            });
        } )
    }