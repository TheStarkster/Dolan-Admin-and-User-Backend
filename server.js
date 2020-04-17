const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");

app.use(bodyParser.json());
//file upload...
app.use(fileUpload());
// CORS Configs...
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(express.static("public"));
app.use("/wallpaperCategory", express.static(__dirname + "/wallpaperCategory"));
app.use("/popularWallpaperCategory", express.static(__dirname + "/popularWallpaperCategory"));
app.use("/wallpapers", express.static(__dirname + "/wallpapers"));
app.use("/ringtoneCategories", express.static(__dirname + "/ringtoneCategories"));
app.use("/notRingtonecategories", express.static(__dirname + "/notRingtonecategories"));
app.use("/popNotRingtoneCategories", express.static(__dirname + "/popNotRingtoneCategories"));
app.use("/notringtone", express.static(__dirname + "/notringtone"));
app.use("/wallpaperColorCategory", express.static(__dirname + "/wallpaperColorCategory"));
app.use("/thumbnail", express.static(__dirname + "/thumbnail"));
app.use("/", require("./routes/path"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
