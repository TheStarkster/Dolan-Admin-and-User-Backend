const router = require("express").Router();
const auth = require("../middleware/auth");
const wallpaper = require("../middleware/wallpapers");
const ringtone = require("../middleware/ringtones");
const notringtone = require("../middleware/notringtones");

router.post("/auth/login", (req, res) => auth.loginHandler(req, res));
//save all types of assets.....
router.post("/wallpaper/create", (req, res) =>
  wallpaper.createwallpaper(req, res)
);
router.post("/ringtone/create", (req, res) =>
  ringtone.createringtone(req, res)
);
router.post("/notringtone/create", (req, res) =>
  notringtone.createnoteringtone(req, res)
);
////////////////////////////////////////////////
//get wallpapers from normal categories....
router.get("/wallpaper/category/normal/:cid/:id", (req, res) =>
  wallpaper.getwallpaper(req, res)
);
//get wallpapers from most search (popular) categories....
router.get("/wallpaper/category/popular/:cid/:id", (req, res) =>
  wallpaper.getPopSearchedWallpaper(req, res)
);
//get latest popular keywords for wallpaper....
router.get("/get-wallpaper-popular-catagory", (req, res) => {
  wallpaper.getPopularCatagories(req, res);
});
//get to get highest downloaded wallappers.....
router.get("/get-popular-wallpapers/:id", (req, res) => {
  wallpaper.getPopularWallpapers(req, res);
});
//get all wallpaper catagories....(NOT NEEDED)
router.get("/get-wallpaper-catagory", (req, res) => {
  wallpaper.getCatagories(req, res);
});
//get wallpaper colors Categories....
router.get("/get-wallpaper-color-category", (req, res) => {
  wallpaper.getColorCategories(req, res);
});
//get wallpaper according to color....
router.get("/get-wallpaper-of-color/:cid/:id", (req, res) => {
  wallpaper.getColoredWallpaper(req, res);
});
//create wallpaper color category.....
router.post("/create/wallpaper-color-category", (req, res) => {
  wallpaper.createColorCategory(req, res);
});
router.post("/create/wallpaper-category", (req, res) => {
  wallpaper.createCategory(req, res);
});
router.post("/create/popular-wallpaper-category", (req, res) => {
  wallpaper.createPopularCategory(req, res);
});
////////////////////////////////////////////////
//to get popular ringtones....
router.get("/ringtone/normal/:cid/:id", (req, res) =>
  ringtone.getNormRingtones(req, res)
);
//to get normal category ringtone....
router.get("/get-popular-ringtones/:id", (req, res) =>
  ringtone.getPopRingtones(req, res)
);
//to get most searched (popular) category ringtone....
router.get("/ringtone/popular/category/:cid/:id", (req, res) =>
  ringtone.getPopSearchedRingtones(req, res)
);
//get popular ringtone categories....
router.get("/get-ringtone-popular-catagory", (req, res) => {
  ringtone.getPopularCatagories(req, res);
});

//get ringtone normal categories....
router.get("/get-ringtone-catagory", (req, res) => {
  ringtone.getCategory(req, res);
});
//create popular ringtone category...
router.post("/create/popular-ringtone-category", (req, res) => {
  ringtone.cratePopularCategories(req, res);
});
router.post("/create/ringtone-category", (req, res) => {
  ringtone.createCategory(req, res);
});
////////////////////////////////////////////////
router.get("/notificationringtone/:cid/:id", (req, res) =>
  notringtone.getnotringtone(req, res)
);
router.get("/notificationringtone-popular/:cid/:id", (req, res) =>
  notringtone.getPopNotringtone(req, res)
);
router.get("/get-notringtone-popular-catagory", (req, res) => {
  notringtone.getpopCategory(req, res);
});
router.get("/get-notringtone-catagory", (req, res) => {
  notringtone.getCategory(req, res);
});
router.post("/create/notringtone-category", (req, res) => {
  notringtone.createCategory(req, res);
});

router.post("/create/popular-notringtone-category", (req, res) => {
  notringtone.createPopularCategory(req, res);
});

module.exports = router;
