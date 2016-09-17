import {Client} from 'azure-event-hubs';

const connStr = 'HostName=udot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=oVSMJLbkeXHXInJNnb6OQBm7t5HpYEeAhHtHNq5rTWU=';

const printError = (err) => console.log(err.message);

const printMessage = (message) => {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  console.log('');
};

let client = Client.fromConnectionString(connStr);
client.open()
  .then(client.getPartitionIds.bind(client))
  .then((pids) => {
    return pids.map( (pid ) => {
      return client.createReceiver('$Default', pid, {'startAfterTime': Date.now()}).then((recvr) => {
        console.log('Created partition receiver: ' + pid)
        recvr.on('errorReceived', printError);
        recvr.on('message', printMessage);
      });
    });
  })
  .catch(printError);
