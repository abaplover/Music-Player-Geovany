const { authJwt } = require("../middleware");
const controller = require("../controllers/song.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    var router = require("express").Router();

    router.get("/", controller.getAllSongs);

    router.get("/:id", controller.getSong );

    router.post("/", controller.createSong);

    router.put("/:id", controller.updateSong);

    router.delete("/:id", controller.deleteSong);

    app.use('/api/song', router);

}