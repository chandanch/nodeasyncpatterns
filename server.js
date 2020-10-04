const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

const DataMonitor = require("./server/DataMonitor");

// creating an instance of DataMonitor
const dataMonitor = new DataMonitor();

// listen to the events using on()
dataMonitor.on("dataAdded", () => {
  console.log(`New data has been added`);
});

const clothing = require("./server/routes/clothing")(dataMonitor);
const errors = require("./server/routes/errors");

const app = express();

app.use(favicon(path.join(__dirname, "dist/favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/clothing", clothing);
app.use("/api/errors", errors);

//////// TEST APIs
app.get("/api/asynctest", async (rq, res) => {
  console.log("Getting data...");
  const data = await asyncTest();
  console.log("Data Recieved");
  res.send(data);
  console.log("Done!");
});

app.get("/api/asynctest2", async (rq, res) => {
  console.log("Getting data...");
  asyncTest().then((data) => {
    console.log("Data Recieved");
    res.send(data);
  });
  console.log("Done!");
});
////////////////

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));

console.log("Listening on port: " + app.get("port"));

module.exports = app;

function asyncTest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data Recieved...");
    }, 3000);
  });
}
