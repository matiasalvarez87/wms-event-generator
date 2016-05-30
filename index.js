var Random = require("random-js");
var OplogEvent = require("./OplogEvent.js");
var http = require("http");

var r = new Random(Random.engines.mt19937().seedWithArray([0x12345678, 0x90abcdef]));

var settings = {
  order: { min:   300000, max: 1000000 },
  events: { min:   10000, max: 3000000 }
};

// Init auto generator program
function generateEvents() {
  step1();
  setTimeout(generateEvents, r.integer(settings.order.min, settings.order.max));
}
generateEvents();

function distribution() {
  return r.integer(settings.events.min, settings.events.max);
}


// Step 1
function step1() {
  var e = new OplogEvent();
  e.setStep1Data();
  if (r.bool(.87))
    setTimeout(step2, distribution(), e);
}

// Step 2
function step2(e) {
  e.setStep2Data();
  if (r.bool(.76))
    setTimeout(step3, distribution(), e);
}

// Step 3
function step3(e) {
  e.setStep3Data();
  if (r.bool(.74))
    setTimeout(step4, distribution(), e);
  else if (r.bool(.4))
    setTimeout(setPickingExceptionData, distribution(), e);
}

// Step 4
function step4(e) {
  e.setStep4Data();
  if (r.bool(.6))
    setTimeout(step5, distribution(), e);
}

// Step 5
function step5(e) {
  e.setStep5Data();
  if (r.bool(.6))
    setTimeout(step6, distribution(), e);
}

// Step 6
function step6(e) {
  e.setStep6Data();
  if (r.bool(.6))
    setTimeout(step7, distribution(), e);
  else if (r.bool(.2))
    setTimeout(setVKExceptionData, distribution(), e);
}

// Step 7
function step7(e) {
  e.setStep7Data();
  if (r.bool(.6))
    setTimeout(step8, distribution(), e);
}

// Step 8
function step8(e) {
  e.setStep8Data();
  if (r.bool(.5))
    setTimeout(step9, distribution(), e);
}

// Step 9
function step9(e) {
  e.setStep9Data();
}
