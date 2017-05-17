# Vue-Mqtt

Connect to mqtt through websocket, implementation for Vuejs 2

## Install

``` bash
npm install vue-mqtt --save
```

## Usage
#### Configuration
``` js
import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://iot.eclipse.org/ws');
```

#### On Vuejs instance usage

The 4th parameter for reading is used

``` js
var vm = new Vue({
  mqtt:{
    // for 4th parameter of topic
    test: function(val){
      console.log('this method ...')
    },
    // for full topic
    'param/param/param/test': function(val){
      console.log('this method ...')
    },
  },
  methods: {
    clickSub: function(val){
        this.$mqtt.subscribe('param/param/param/test')
    },
    clickPub: function(val){
        this.$mqtt.publish('param/param/param/test', 'message')
    }
  }
})
```
