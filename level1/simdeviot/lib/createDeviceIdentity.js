import iothub from 'azure-iothub';

const connString = 'HostName=udot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=oVSMJLbkeXHXInJNnb6OQBm7t5HpYEeAhHtHNq5rTWU=';

let registry = iothub.Registry.fromConnectionString(connString);

let device = new iothub.Device(null);
device.deviceId = 'udotNodeDevice1';
registry.create(device, (err, deviceInfo, res) => {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device id: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
  }
}
