#!/usr/bin/env node
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883', {
    username: 'guest',
    password: 'guest'
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('inhandpub', (err) => {
        if (!err) {
            client.publish('test/topic', 'Hello MQTT');
        }
    });
});

client.on('message', (topic, message) => {
    const objectData = JSON.parse(message)
    const timestamp = objectData["timestamp"];

    const date = new Date(timestamp * 1000)
    const realDate = date.toDateString() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const group_name = objectData["group_name"];
    const humid = objectData["values"]["FakeTCP"]["humid"]["raw_data"]
    const speed = objectData["values"]["FakeTCP"]["speed"]["raw_data"]
    const pressure = objectData["values"]["FakeTCP"]["pressure"]["raw_data"]
    const temperature = objectData["values"]["FakeTCP"]["temperature"]["raw_data"]
    console.log(`Topic ${topic}: ${realDate.toString()} : ${humid} ,${speed} ,${pressure} ,${temperature}`);
});


// var amqp = require('amqplib/callback_api');

// async function createConsumer1() {

//     amqp.connect('amqp://localhost:5672', function (error0, connection) {
//         if (error0) {
//             throw error0;
//         }
//         connection.createChannel(function (error1, channel) {
//             if (error1) {
//                 throw error1;
//             }
//             var queue = 'hello';

//             channel.assertQueue(queue, {
//                 durable: false
//             });
//             channel.consume(queue, function (msg) {
//                 console.log(" [x] Received %s", msg.content.toString());
//             }, {
//                 noAck: true
//             });
//         });
//     });
// }

// for (var i = 0; i < 3; i++) {
//     createConsumer1();
// }