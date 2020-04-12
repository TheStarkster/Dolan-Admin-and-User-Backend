const router = require("express").Router();
const auth = require("../middleware/auth");
const wallpaper = require("../middleware/wallpapers");
const ringtone = require("../middleware/ringtones");
const notringtone = require("../middleware/notringtones");

router.post("/auth/login", (req, res) => auth.loginHandler(req, res));
router.post("/wallpaper/create", (req, res) =>
  wallpaper.createwallpaper(req, res)
);
router.post("/ringtone/create", (req, res) =>
  ringtone.createringtone(req, res)
);
router.post("/notringtone/create", (req, res) =>
  notringtone.createnoteringtone(req, res)
);
router.get("/wallpaper/normal-category/:cid/:id", (req, res) =>
  wallpaper.getwallpaper(req, res)
);
router.get("/wallpaper/popular-category/:cid/:id", (req, res) =>
  wallpaper.getpopwallpaper(req, res)
);
router.get("/ringtone/normal/category/:id", (req, res) =>
  ringtone.getringtones(req, res)
);
router.get("/ringtone/popular/category/:id", (req, res) =>
  ringtone.getpopringtones(req, res)
);
router.get("/notificationringtone/:id", (req, res) =>
  notringtone.getnotringtone(req, res)
);
router.get("/get-popular-catagories", (req, res) => {
  wallpaper.getPopularCatagories(req, res);
});

//popular api...
router.get("/get-popular-wallpapers/:id", (req, res) => {
  wallpaper.getPopularWallpapers(req, res);
});

module.exports = router;
