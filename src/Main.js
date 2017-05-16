import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue, connection, store){

        if(!connection) throw new Error("[Vue-Mqtt] cannot locate connection")

        let observer = new Observer(connection, store)

        Vue.prototype.$mqtt = observer.Mqtt;

        Vue.mixin({
            created() {
                let mqtt = this.$options['mqtt']

                this.$options.mqtt = new Proxy({}, {
                    set: (target, key, value) => {
                        Emitter.addListener(key, value, this)
                        target[key] = value
                        return true;
                    },
                    deleteProperty: (target, key) => {
                        Emitter.removeListener(key, this.$options.mqtt[key], this)
                        delete target.key;
                        return true
                    }
                })

                if (mqtt) {
                    Object.keys(mqtt).forEach((key) => {
                        this.$options.mqtt[key] = mqtt[key];
                    });
                }
            },
            beforeDestroy(){
                let mqtt = this.$options['mqtt']

                if(mqtt){
                    Object.keys(mqtt).forEach((key) => {
                        delete this.$options.mqtt[key]
                    });
                }
            }
        })

    }

}


