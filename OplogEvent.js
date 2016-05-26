var request = require('request');
var Random = require("random-js");
var r = new Random(Random.engines.mt19937().seedWithArray([0x12345678, 0x90abcdef]));

var workstations = ["WS-01", "WS-02", "WS-03", "WS-04", "WS-05", "WS-06", "WS-07", "WS-08", "WS-09", "WS-10"];
var staff = ["Swoop", "John", "Jake", "Tiffany", "Brittany", "Luis", "Joe", "Valerie", "Brian", "Jose"];

function send(e) {
  console.log(JSON.stringify(e));
  // curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 5cb85223-88f6-c878-1b10-65b5081ee3bf" -d '{ "eventFamily" : "Web Order", "event" : "Confirmed", "eventType" : "Order", "entityId": "23013", "workstationId": "WS-01", "staffId": "John", "serviceId": "Magento" }' "http://127.0.0.1:9999"

  request({
    uri: 'http://127.0.0.1:9999',
    json: e
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    } else {
      console.error(error);
    }
  })
}

class OplogEvent {

  construct() {
  }

  setStep1Data() {
    this.eventFamily = "Web Order";
    this.event = "Confirmed";
    this.eventType = "Order";
    this.entityId = "" + r.integer(10000, 99999);
    this.workstationId = r.pick(workstations);
    this.staffId = r.pick(staff);
    this.serviceId = "Magento";
    send(this);
  }

  setStep2Data() {
    // this.eventFamily = "Web Order";
    this.event = "Printed";
    // this.eventType = "Order";
    // this.entityId = r.integer(10000, 99999);
    this.workstationId = r.pick(workstations);
    this.staffId = r.pick(staff);
    // this.serviceId = "Magento";
    send(this);
  }

  setStep3Data() {
    this.eventFamily = "Picking";
    this.event = "Started";
    this.eventType = "Item";
    this.parentId = this.entityId;
    this.entityId = r.integer(10000, 99999) + " " + r.integer(1000, 9999);
    this.workstationId = r.pick(workstations);
    this.staffId = r.pick(staff);
    this.serviceId = "Picking Station";
    send(this);
  }

  setStep4Data() {
    // this.eventFamily = "Picking";
    this.event = "Picked";
    // this.eventType = "Item";
    // this.parentId = this.entityId;
    // this.entityId = r.integer(10000, 99999) + " " + r.integer(1000, 9999);
    // this.workstationId = r.pick(workstations);
    // this.staffId = r.pick(staff);
    // this.serviceId = "Picking Station";
    send(this);
  }

  setStep5Data() {
    // this.eventFamily = "Picking";
    this.event = "Dropped";
    // this.eventType = "Item";
    // this.parentId = this.entityId;
    // this.entityId = r.integer(10000, 99999) + " " + r.integer(1000, 9999);
    // this.workstationId = r.pick(workstations);
    // this.staffId = r.pick(staff);
    // this.serviceId = "Picking Station";
    send(this);
  }

  setStep6Data() {
    this.eventFamily = "Vking";
    this.event = "Started";
    // this.eventType = "Item";
    // this.parentId = this.entityId;
    // this.entityId = r.integer(10000, 99999) + " " + r.integer(1000, 9999);
    this.workstationId = r.pick(workstations);
    this.staffId = r.pick(staff);
    this.serviceId = "VK Station";
    send(this);
  }

  setStep7Data() {
    // this.eventFamily = "Vking";
    this.event = "Finished";
    // this.eventType = "Item";
    // this.parentId = this.entityId;
    // this.entityId = r.integer(10000, 99999) + " " + r.integer(1000, 9999);
    // this.workstationId = r.pick(workstations);
    // this.staffId = r.pick(staff);
    // this.serviceId = "VK Station";
    send(this);
  }

  setStep8Data() {
    this.eventFamily = "Shipping";
    this.event = "Started";
    this.eventType = "Order";
    this.entityId = this.parentId;
    delete this.parentId;
    this.workstationId = r.pick(workstations);
    this.staffId = r.pick(staff);
    this.serviceId = "Ship Station";
    send(this);
  }

  setStep9Data() {
    // this.eventFamily = "Shipping";
    this.event = "Finished";
    // this.eventType = "Order";
    // this.entityId = this.parentId;
    // this.parentId = null;
    // this.workstationId = r.pick(workstations);
    // this.staffId = r.pick(staff);
    // this.serviceId = "Ship Station";
    send(this);
  }
}

module.exports = OplogEvent;
