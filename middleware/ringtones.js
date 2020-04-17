const ringtone = require("../models/ringtone");
const nrtr = require("../models/nrtr");
const prtr = require("../models/prtr");
const ringtoneCategory = require("../models/ringtoneCategories");
const popRingtoneCategory = require("../models/popularRingtoneCategories");

module.exports = {
  createringtone: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../ringtones/${file.name}`, (err) => {});
    ringtone
      .create({
        Name: req.body.name,
        Author: req.body.author,
        Downloads: req.body.download,
        Path: "http://localhost:5000/ringtones/" + file.name,
      })
      .then((RingRes) => {
        nrtr
          .create({
            CatID: req.body.normacategory,
            SID: RingRes.id,
          })
          .then((nrtrRes) => {
            if (req.body.ispopular == "true") {
              prtr
                .create({
                  CatID: req.body.popcatid,
                  NRTRID: nrtrRes.id,
                })
                .then((u) => {
                  res.send(u);
                });
            } else {
              res.send(nrtrRes);
            }
          });
      });
  },
  createCategory: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../ringtoneCategories/${file.name}`, (err) => {
      console.log(err);
    });
    ringtoneCategory
      .create({
        Name: req.body.name,
        background: "http://localhost:5000/ringtoneCategories/" + file.name,
      })
      .then((u) => {
        res.send(u);
      });
  },
  getCategory: (req, res) => {
    ringtoneCategory.findAll().then((u) => {
      res.send(u);
    });
  },
  getPopularCatagories: (req, res) => {
    popRingtoneCategory.findAll().then((u) => res.send(u));
  },
  cratePopularCategories: (req, res) => {
    const file = req.files.file;
    file.mv(
      `${__dirname}/../popularRingtoneCategories/${file.name}`,
      (err) => {}
    );
    popRingtoneCategory
      .create({
        Name: req.body.name,
        background:
          "http://localhost:5000/popularRingtoneCategories/" + file.name,
      })
      .then((u) => {
        res.send(u);
      });
  },
  getringtones: (req, res) => {
    console.log(req.body);
    nrtr
      .findAll({
        where: {
          id: req.params.id,
        },
        raw: true,
      })
      .then((y) => {
        console.log(y);
        ringtone
          .findAll({
            where: {
              id: y.map((a) => a.SID),
            },
            raw: true,
          })
          .then((z) => {
            res.send(z);
          });
      });
  },
  getpopringtones: (req, res) => {
    console.log(req.body);
    prtr
      .findAll({
        where: {
          id: req.params.id,
        },
        raw: true,
      })
      .then((a) => {
        console.log(a);
        nrtr
          .findAll({
            where: {
              id: a.map((b) => b.NRTRID),
            },
            raw: true,
          })
          .then((b) => {
            console.log(b);
            ringtone
              .findAll({
                where: {
                  id: b.map((c) => c.SID),
                },
                raw: true,
              })
              .then((c) => {
                res.send(c);
              });
          });
      });
  },
};
