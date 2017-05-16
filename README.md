# Vue-Mqtt

mqtt implementation for Vuejs 2

## Install

``` bash
npm install vue-mqtt --save
```

## Usage
#### Configuration
``` js
import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://example.com:1883');
```

#### On Vuejs instance usage

The 4th parameter for reading is used

``` js
var vm = new Vue({
  mqtt:{
    test: function(val){
      console.log('this method ...')
    }
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
