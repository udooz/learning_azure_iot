import {clientFromConnectionString} from 'azure-iot-device-amqp';
import {Message} from 'azure-iot-device';

const connStr = 'HostName=udot.azure-devices.net;DeviceId=MyArdunio1;SharedAccessKey=G+Uffw3BzCsa3tSD3ydVLv50TMNSpl5rsNyti2YdkQI='; // SharedAccessKey is here device key

let client = clientFromConnectionString(connStr);

const printResultFor = (op) => {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
};

let connectCallback = (err) => {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(() => {
        var windSpeed = 10 + (Math.random() * 4);
        var data = JSON.stringify({ deviceId: 'MyArdunio1', windSpeed: windSpeed });
        var message = new Message(data);
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 1000);
  }
};

client.open(connectCallback);
