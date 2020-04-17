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
router.get("/get-popular-wallpapers/:id", (req, res) => {
  wallpaper.getPopularWallpapers(req, res);
});
router.get("/ringtone/normal/category/:id", (req, res) =>
  ringtone.getringtones(req, res)
);
router.get("/ringtone/popular/category/:id", (req, res) =>
  ringtone.getpopringtones(req, res)
);
router.get("/notificationringtone/:id", (req, res) =>
  notringtone.getnotringtone(req, res)
);

router.get("/get-wallpaper-popular-catagory", (req, res) => {
  wallpaper.getPopularCatagories(req, res);
});
router.get("/get-ringtone-popular-catagory", (req, res) => {
  ringtone.getPopularCatagories(req, res);
});
router.get("/get-notringtone-popular-catagory", (req, res) => {
  notringtone.getpopCategory(req, res);
});
router.get("/get-wallpaper-catagory", (req, res) => {
  wallpaper.getCatagories(req, res);
});
router.get("/get-ringtone-catagory", (req, res) => {
  ringtone.getCategory(req, res);
});
router.get("/get-notringtone-catagory", (req, res) => {
  notringtone.getCategory(req, res);
});
router.post("/create/wallpaper-category", (req, res) => {
  wallpaper.createCategory(req, res);
});
router.post("/create/ringtone-category", (req, res) => {
  ringtone.createCategory(req, res);
});
router.post("/create/notringtone-category", (req, res) => {
  notringtone.createCategory(req, res);
});
router.post("/create/popular-wallpaper-category", (req, res) => {
  wallpaper.createPopularCategory(req, res);
});
router.post("/create/popular-ringtone-category", (req, res) => {
  ringtone.cratePopularCategories(req, res);
});
router.post("/create/popular-notringtone-category", (req, res) => {
  notringtone.createPopularCategory(req, res);
});

router.get("/get-wallpaper-color-category", (req, res) => {
  wallpaper.getColorCategories(req, res);
});
router.post("/create/wallpaper-color-category", (req, res) => {
  wallpaper.createColorCategory(req, res);
});

module.exports = router;
