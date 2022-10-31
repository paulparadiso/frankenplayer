const mqtt = require('mqtt');

module.exports = ({host, schema}) => {

    console.log(host, schema);

    const port = '1883';

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;

    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        reconnectPerioc: 1000
    });

    client.on('connect', () => {
        console.log('connected to mqtt');
        client.subscribe('#', () => {
            console.log('subscribed to all topics');
        })
    })

    client.on('message', (topic, payload) => {
        console.log(`Message received: ${topic}, ${payload}`);
    });
}