const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

// checks if the execution is occuring on main thread
if (isMainThread) {
  console.log("Starting on Main Thread");

  // creating an instance of worker and passing the file name -- current file
  // passing intial data to worker using the options param of Worker constructor
  // this will initalize the worker with initial data
  const worker = new Worker(__filename, {
    workerData: {
      outputPrefix: "Msg Recieved",
      wasterTimeout: 3000,
    },
  });

  // recieve message from worker thread using on() with event name `message`
  worker.on("message", (msg) => console.log(`Worker: ${msg}`));

  // post message/data to worker
  worker.postMessage("Done with Workers");

  console.log("Finished executing on Main Thread");
} else {
  // recieve message/data from parent
  parentPort.on("message", (msg) => {
    // using workerData object to get initial data from parent
    console.log(`${workerData.outputPrefix}: ${msg}`);
  });

  // send messages back to the main thread using postMessage()
  parentPort.postMessage("Now starting worker thread");
  wasteTime(workerData.wasterTimeout);
  parentPort.postMessage("Executed task 1");
  wasteTime(workerData.wasterTimeout);
  parentPort.postMessage("Finised Executing");
}

function wasteTime(delay) {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
}
