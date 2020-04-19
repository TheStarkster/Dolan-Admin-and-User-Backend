const ringtone = require("../models/ringtone");
const nrtr = require("../models/nrtr");
const prtr = require("../models/prtr");
const Op = require("sequelize").Op;
const ringtoneCategory = require("../models/ringtoneCategories");
const popRingtoneCategory = require("../models/popularRingtoneCategories");

module.exports = {
  createringtone: (req, res) => {
    if (req.body.haveFile == "true") {
      const file = req.files.file;
      file.mv(`${__dirname}/../ringtones/${file.name}`, (err) => {});
    }
    ringtone
      .create({
        Name: req.body.name,
        Author: req.body.author,
        Downloads: req.body.download,
        Path:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/ringtones/" + file.name
            : req.body.fileUrl,
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
    if (req.body.haveFile == "true") {
      const file = req.files.file;
      file.mv(`${__dirname}/../ringtoneCategories/${file.name}`, (err) => {
        console.log(err);
      });
    }
    ringtoneCategory
      .create({
        Name: req.body.name,
        background:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/ringtoneCategories/" + file.name
            : req.body.fileUrl,
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
    if (req.body.haveFile == "true") {
      const file = req.files.file;
      file.mv(
        `${__dirname}/../popularRingtoneCategories/${file.name}`,
        (err) => {}
      );
    }
    popRingtoneCategory
      .create({
        Name: req.body.name,
        background:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/popularRingtoneCategories/" +
              file.name
            : req.body.fileUrl,
      })
      .then((u) => {
        res.send(u);
      });
  },
  getNormRingtones: (req, res) => {
    nrtr
      .findAll({
        limit: 6,
        where: {
          CatID: req.params.cid,
        },
        id: {
          [Op.gt]: req.params.id,
        },
      })
      .then((nrtrRes) => {
        ringtone
          .findAll({
            where: {
              id: nrtrRes.map((a) => a.SID),
            },
          })
          .then((u) => {
            res.send({
              data: u,
              lastId: nrtrRes[nrtrRes.length - 1],
            });
          });
      });
  },
  getPopSearchedRingtones: (req, res) => {
    console.log(req.body);
    prtr
      .findAll({
        where: {
          id: req.params.id,
        },
        id: {
          [Op.gt]: req.params.id,
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
                res.send({
                  data: c,
                  lastId: b[b.length - 1],
                });
              });
          });
      });
  },
  getPopRingtones: (req, res) => {
    ringtone
      .findAll({
        limit: 12,
        where: {
          Downloads: {
            [Op.gt]: req.params.id,
          },
        },
      })
      .then((u) => {
        res.send(u);
      });
  },
};
