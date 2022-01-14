const { authJwt } = require("../middleware");
const controller = require("../controllers/song.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../mcqueeninc.net/music');
  },
  filename: function (req, file, cb) {
    cb(null, "_" + file.originalname);
  }
});

const storageMp3 = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.get("/", controller.getAllSongs);

  router.get("/:id", controller.getSong);

  router.post("/",storageMp3.fields([{
    name: 'Src', maxCount: 1
  },
  {
    name: 'SongImg', maxCount: 1
  }]), controller.createSong);

  router.put("/:id", controller.updateSong);

  router.delete("/:id", controller.deleteSong);

  app.use('/api/song', router);

}