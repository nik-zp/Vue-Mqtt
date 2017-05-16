import Emitter from './Emitter'
import Mqtt from 'mqtt'

export default class {

    constructor(connection, store) {
        if (typeof connection == 'string') {
            this.Mqtt = Mqtt.connect(connection);
        } else {
            this.Mqtt = connection
        }

        this.onEvent()
    }

    onEvent() {
        this.Mqtt.on('message', (topic, payload, packet) => {
            var exp = topic.split('/');
            if (exp[3]) {
                Emitter.emit(exp[3], payload);
            }
        });
    }

}
