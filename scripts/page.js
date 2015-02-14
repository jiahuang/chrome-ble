
function populateBLE(devices) {
  var devicesList = document.getElementById('devices');
  devices.forEach(function(device){
    var deviceEle = document.createElement("li");
    deviceEle.appendChild(document.createTextNode(device));
    devicesList.appendChild(deviceEle);
  });
}

function updateDevice(device){
  console.log("device", device);
}

function removeDevice(device){
  console.log("remove device", device);
}

// Add listeners to receive newly found devices and updates
// to the previously known devices.
chrome.bluetooth.onDeviceAdded.addListener(updateDevice);
chrome.bluetooth.onDeviceChanged.addListener(updateDevice);
chrome.bluetooth.onDeviceRemoved.addListener(removeDevice);

document.addEventListener('DOMContentLoaded', function() {
  console.log("!!!!");
  populateBLE(["a", "b"]);
  chrome.bluetooth.getAdapterState(function(adapter) {
    console.log("Adapter " + adapter.address + ": " + adapter.name);
  });

  chrome.bluetooth.getDevices(function(devices){
    console.log("starting out with devices", devices);
  })

  chrome.bluetooth.startDiscovery(function() {
    console.log("starting discovery");
    // Stop discovery after 30 seconds.
    setTimeout(function() {
      chrome.bluetooth.stopDiscovery(function() {});
    }, 30000);
  });
});