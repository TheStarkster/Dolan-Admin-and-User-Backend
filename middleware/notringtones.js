const notringtone = require("../models/nrtst");
const notRingtoneReference = require("../models/notRingtoneReference");
const popNotRingtoneReference = require("../models/popNotRingtoneReference");
const notringtoneCategories = require("../models/notificationRingtoneCategory");
const pNRTcategories = require("../models/popNotRingtoneCategories");
module.exports = {
  createnoteringtone: (req, res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/../notringtone/${file.name}`, (err) => {});
    notringtone
      .create({
        Name: req.body.name,
        Author: req.body.author,
        Downloads: req.body.download,
        Path: "http://localhost:5000/notringtone/" + file.name,
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
    notringtone
      .findAll({
        where: {
          id: req.params.id,
        },
        raw: true,
      })
      .then((d) => {
        res.send(d);
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
    const file = req.files.file;
    file.mv(`${__dirname}/../notRingtonecategories/${file.name}`, (err) => {});
    notringtoneCategories
      .create({
        Name: req.body.name,
        background: "http://localhost:5000/notRingtonecategories/" + file.name,
      })
      .then((u) => {
        res.send(u);
      });
  },
  createPopularCategory: (req, res) => {
    const file = req.files.file;
    file.mv(
      `${__dirname}/../popNotRingtoneCategories/${file.name}`,
      (err) => {}
    );
    pNRTcategories
      .create({
        Name: req.body.name,
        background:
          "http://localhost:5000/popNotRingtoneCategories/" + file.name,
      })
      .then((u) => {
        res.send(u);
      });
  },
};
