const notringtone = require("../models/nrtst");
const notRingtoneReference = require("../models/notRingtoneReference");
const popNotRingtoneReference = require("../models/popNotRingtoneReference");
const notringtoneCategories = require("../models/notificationRingtoneCategory");
const pNRTcategories = require("../models/popNotRingtoneCategories");
const Op = require("sequelize").Op;
module.exports = {
  createnoteringtone: (req, res) => {
    var file;
    if (req.body.haveFile == "true") {
      file.mv(`${__dirname}/../notringtone/${file.name}`, (err) => {});
    }
    notringtone
      .create({
        Name: req.body.name,
        Author: req.body.author,
        Downloads: req.body.download,
        Path:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/notringtone/" + file.name
            : req.body.fileUrl,
      })
      .then((RingRes) => {
        notRingtoneReference
          .create({
            CatID: req.body.normacategory,
            SID: RingRes.id,
          })
          .then((nrtrRes) => {
            if (req.body.ispopular == "true") {
              popNotRingtoneReference
                .create({
                  CatID: req.body.popcatid,
                  NNRTRID: nrtrRes.id,
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
  getnotringtone: (req, res) => {
    console.log(req.body);
    notRingtoneReference
      .findAll({
        limit: 12,
        where: {
          CatID: req.params.cid,
        },
      })
      .then((nRes) => {
        notringtone
          .findAll({
            where: {
              id: nRes.map((a) => a.SID),
            },
          })
          .then((u) => {
            res.send({
              message: u,
              lastId: nRes[nRes.length - 1],
            });
          });
      });
  },
  getCategory: (req, res) => {
    notringtoneCategories.findAll().then((u) => {
      res.send(u);
    });
  },
  getpopCategory: (req, res) => {
    pNRTcategories.findAll().then((u) => {
      res.send(u);
    });
  },
  createCategory: (req, res) => {
    var file;
    if (req.body.haveFile == "true") {
      file.mv(
        `${__dirname}/../notRingtonecategories/${file.name}`,
        (err) => {}
      );
    }
    notringtoneCategories
      .create({
        Name: req.body.name,
        background:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/notRingtonecategories/" + file.name
            : req.body.fileUrl,
      })
      .then((u) => {
        res.send(u);
      });
  },
  createPopularCategory: (req, res) => {
    var file;
    if (req.body.haveFile == "true") {
      file.mv(
        `${__dirname}/../popNotRingtoneCategories/${file.name}`,
        (err) => {}
      );
    }
    pNRTcategories
      .create({
        Name: req.body.name,
        background:
          req.body.haveFile == "true"
            ? "https://gmai007.herokuapp.com/popNotRingtoneCategories/" +
              file.name
            : req.body.fileUrl,
      })
      .then((u) => {
        res.send(u);
      });
  },

  getPopNotringtone: (req, res) => {
    popNotRingtoneReference
      .findAll({
        limit: 12,
        where: {
          CatID: req.params.cid,
          id: {
            [Op.gt]: req.params.id,
          },
        },
      })
      .then((pRes) => {
        notRingtoneReference
          .findAll({
            where: {
              id: pRes.map((a) => a.SID),
            },
          })
          .then((u) => {
            res.send({
              data: u,
              lastId: pRes[pRes.length - 1],
            });
          });
      });
  },
};
