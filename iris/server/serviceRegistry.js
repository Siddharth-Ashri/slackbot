"use strict";

class ServiceRegistry {
  constructor() {
    this._services = [];
    this._timeout = 30;
  }
  add(intent, ip, port) {
    const key = intent + ip + port;
    if (!this._services[key]) {
      this._services[key] = {};
      //timestamp for the service if it exceeds 30 then the service will be removed
      this._services[key].timestamp = Math.floor(new Date() / 1000);
      this._services[key].intent = intent;
      this._services[key].ip = ip;
      this._services[key].port = port;
      console.log(`Added ${intent} service at ${ip}:${port}`);
      this._services.push(this._services[key]);
      this._cleanup();
      return;
    }
    //update timestamp and log a message
    this._services[key].timestamp = Math.floor(new Date() / 1000);
    console.log(`Updated ${intent} service at ${ip}:${port}`);
    this._cleanup();
  }
  remove(intent, ip, port) {
    const key = intent + ip + port;
    delete this._services[key];
    console.log(`deleted ${intent}`);
  }
  get(intent) {
    this._cleanup();
    for (let key in this._services) {
      if (this._services[key].intent === intent) return this._services[key];
    }
    return null;
  }
  _cleanup() {
    const now = Math.floor(new Date() / 1000);
    for (let key of this._services) {
      if (key.timestamp + this._timeout < now) {
        console.log(`Deleted ${key.intent} service`);
      }
    }
    console.log(this._services.length);
  }
}

module.exports = ServiceRegistry;
