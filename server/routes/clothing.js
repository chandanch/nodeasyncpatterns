const express = require("express");
const fs = require("fs");
const fsPromises = require("fs").promises;
const datafile = "server/data/clothing.json";
const router = express.Router();

module.exports = function (monitor) {
  let dataMonitor = monitor;

  // listen to the events using on()
  dataMonitor.on("dataAdded", (newItem) => {
    console.log(`Item ${newItem} has been added`);
  });

  dataMonitor.on("dataAdded", (newItem) => {
    setImmediate(() => {
      console.log(`New Item ${newItem} has been added successfully!`);
    });
  });

  /* GET all clothing */
  router
    .route("/")
    .get(async function (req, res) {
      try {
        const clothingData = await getClothingDataAsyncAwait();
        // console.log("Recieved data");
        res.send(clothingData);
      } catch (error) {
        res.status(500).send(error);
      }

      // console.log("Doing more work...");
    })

    .post(async function (req, res) {
      try {
        let data = await getClothingDataAsyncAwait();

        let nextID = getNextAvailableID(data);

        let newClothingItem = {
          clothingID: nextID,
          itemName: req.body.itemName,
          price: req.body.price,
        };

        data.push(newClothingItem);

        await saveClothingData(data);

        // emits an event using emit()
        dataMonitor.emit("dataAdded", newClothingItem.itemName);

        console.log("Returning new item to browser.");

        res.status(201).send(newClothingItem);
      } catch (error) {
        res.status(500).send(error);
      }
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

  async function getClothingDataAsyncAwait() {
    const rawData = await fsPromises.readFile(datafile, "utf-8");
    const clothingData = JSON.parse(rawData);

    return clothingData;
  }

  function getNextAvailableID(allClothingData) {
    let maxID = 0;

    allClothingData.forEach(function (element, index, array) {
      if (element.clothingID > maxID) {
        maxID = element.clothingID;
      }
    });
    return ++maxID;
  }

  function saveClothingData(data) {
    return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
  }
  return router;
};
