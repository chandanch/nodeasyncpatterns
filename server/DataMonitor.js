const EventEmitter = require("events");

// Extending the event emitter class
class DataMonitor extends EventEmitter {
  logLevel = "Dev";
}

module.exports = DataMonitor;
