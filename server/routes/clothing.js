const express = require("express");
const fs = require("fs");
const datafile = "server/data/clothing.json";
const router = express.Router();

/* GET all clothing */
router.route("/").get(function (req, res) {
  getClothingDataPromise()
    .then((data) => {
      console.log("Recieved Clothing data");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
    .finally(() => {
      console.log("Finished Promise execution");
    });

  console.log("Doing more work...");
});

function getClothingData(callback) {
  fs.readFile(datafile, "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const clothingData = JSON.parse(data);
      callback(null, clothingData);
    }
  });
}

function getClothingDataPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile(datafile, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  });
}

module.exports = router;
