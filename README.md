# Vue-Mqtt

Connect to mqtt through websocket, implementation for Vuejs 2

## Example

Example [Vue-Mqtt-Example](https://github.com/nik-zp/Vue-Mqtt-Example)

## Install

``` bash
npm install vue-mqtt --save
```

## Usage
#### Configuration
``` js
import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://iot.eclipse.org/ws', options);
```
options: https://github.com/mqttjs/MQTT.js#client

#### Subscribe
```
this.$mqtt.subscribe('param/param/param/test', options)
```
options: https://github.com/mqttjs/MQTT.js#subscribe

#### On Vuejs instance usage

The last parameter for reading is used

``` js
var vm = new Vue({
  mqtt: {
    'param/+/+/test': function(val) {
      console.log('param/+/+/test')
    },
    'param/#': function(val) {
      console.log('param/#')
    },
    'param/param/param/test': function(val) {
      console.log('param/param/param/test')
    },
    'template/+' (data, topic) {
      if (topic.split('/').pop() === '12345') {
        console.log('topic:', 'template/12345')
      }
    },
    'template/+/param/param' (data, topic) {
      if (topic.split('/')[1] === '12345') {
        console.log('topic:', 'template/12345/param/param')
      }
    }
  },
  methods: {
    clickSub: function(val) {
        this.$mqtt.subscribe('param/param/param/test')
    },
    clickPub: function(val) {
        this.$mqtt.publish('param/param/param/test', 'message')
    }
  }
})
```
