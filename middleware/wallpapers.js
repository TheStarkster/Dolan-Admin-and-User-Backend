const wallpaper = require("../models/wallpaper");
const nwr = require("../models/nwr");
const pwr = require("../models/pwr");
const PopularCatagories = require("../models/popularCatagories");
const WallpaperCatagories = require("../models/wallpaperCategory");
const wallpaperColorReferences = require("../models/wallColorReferences");
const wallpaperColorCategories = require("../models/wallpaperColorCategory");
const Op = require("sequelize").Op;

module.exports = {
  createwallpaper: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../wallpapers/${file.name}`, (err) => {});
    const thumbnail = req.files.thumbnail;
    thumbnail.mv(`${__dirname}/../thumbnail/${thumbnail.name}`, (err) => {});
    wallpaper
      .create({
        Name: req.body.name,
        Author: req.body.author,
        Downloads: req.body.download,
        Path: "http://localhost:5000/wallpapers/" + file.name,
        thumbnail: "http://localhost:5000/thumbnail/" + thumbnail.name,
      })
      .then((wallRes) => {
        nwr
          .create({
            CatID: req.body.normacategory,
            SID: wallRes.id,
          })
          .then((nwrRes) => {
            if (req.body.relatedToColor == "true") {
              wallpaperColorReferences.create({
                CatID: req.body.colorID,
                SID: nwrRes.id,
              });
            }
            if (req.body.ispopular == "true") {
              pwr
                .create({
                  CatID: req.body.popcatid,
                  NWRID: nwrRes.id,
                })
                .then((u) => {
                  res.send(u);
                });
            } else {
              res.send(nwrRes);
            }
          });
      });
  },
  getColorCategories: (req, res) => {
    wallpaperColorCategories.findAll().then((u) => {
      res.send(u);
    });
  },
  createColorCategory: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../wallpaperColorCategory/${file.name}`, (err) => {
      console.log(err);
    });
    wallpaperColorCategories
      .create({
        Name: req.body.name,
        background: "http://localhost:5000/wallpaperColorCategory/" + file.name,
      })
      .then((u) => {
        res.send(u);
      });
  },
  getColoredWallpaper: (req, res) => {
    wallpaperColorReferences
      .findAll({
        limit: 6,
        where: {
          CatID: req.params.cid,
        },
      })
      .then((colorRes) => {
        wallpaper
          .findAll({
            where: {
              id: colorRes.map((a) => a.SID),
            },
          })
          .then((sendoo) => {
            res.send(sendoo);
          });
      });
  },
  getwallpaper: (req, res) => {
    nwr
      .findAll({
        limit: 6,
        where: {
          CatID: req.params.cid,
          id: {
            [Op.gt]: req.params.id,
          },
        },
        raw: true,
      })
      .then((u) => {
        wallpaper
          .findAll({
            where: {
              id: u.map((a) => a.SID),
            },
            raw: true,
          })
          .then((s) => {
            res.send(s);
          });
      });
  },
  getPopSearchedWallpaper: (req, res) => {
    pwr
      .findAll({
        where: {
          CatID: req.params.cid,
          id: {
            [Op.gt]: req.params.id,
          },
        },
        raw: true,
        limit: 9,
      })
      .then((popwallRes) => {
        nwr
          .findAll({
            where: {
              id: popwallRes.map((a) => a.NWRID),
            },
          })
          .then((u) => {
            wallpaper
              .findAll({
                id: u.map((a) => a.SID),
              })
              .then((sendoo) => {
                res.send(sendoo);
              });
          });
      });
  },
  getPopularCatagories: (req, res) => {
    PopularCatagories.findAll({ raw: true }).then((u) => {
      res.send(u);
    });
  },
  getCatagories: (req, res) => {
    WallpaperCatagories.findAll({ raw: true }).then((u) => {
      res.send(u);
    });
  },
  getPopularWallpapers: (req, res) => {
    wallpaper
      .findAll({
        where: {
          Downloads: {
            [Op.gt]: 1000,
          },
          id: {
            [Op.gt]: req.params.id,
          },
        },
        limit: 6,
      })
      .then((u) => {
        res.setHeader("Cache-Control", "public, max-age=194573");
        res.send(u);
      });
  },
  createCategory: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../wallpaperCategory/${file.name}`, (err) => {
      console.log(err);
    });
    WallpaperCatagories.create({
      Name: req.body.name,
      background: "http://localhost:5000/wallpaperCategory/" + file.name,
    }).then((u) => {
      res.send(u);
    });
  },
  createPopularCategory: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../popularWallpaperCategory/${file.name}`, (err) => {
      console.log(err);
    });
    PopularCatagories.create({
      Name: req.body.name,
      background: "http://localhost:5000/popularWallpaperCategory/" + file.name,
    }).then((u) => {
      res.send(u);
    });
  },
};
