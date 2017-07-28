import Emitter from './Emitter'
import Mqtt from 'mqtt'

export default class {

    constructor(connection, options) {
        if (typeof connection === 'string') {
            this.Mqtt = Mqtt.connect(connection, options);
        } else {
            this.Mqtt = connection
        }

        this.Mqtt.on('message', (topic, payload, packet) => {
            Emitter.emit(topic, payload);
        });
    }

}
