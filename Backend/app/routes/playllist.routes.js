const { authJwt } = require("../middleware");
const controller = require("../controllers/playlist.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    var router = require("express").Router();

    router.get("/", controller.getAll);

    router.get("/:id", controller.getPlaylist );

    router.post("/", controller.create);

    router.post("/addSong", controller.addPlaylistSong);

    router.put("/:id", controller.update);

    router.delete("/:id", controller.delete);

    router.post("/deleteSong", controller.deleteSongPlaylist);


    app.use('/api/playlist', router);

}