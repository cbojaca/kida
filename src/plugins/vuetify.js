import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VueRandomColor from 'vue-randomcolor'

Vue.use(VueRandomColor);
//var randomColor = require('randomcolor');

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#1976D2",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
    //random: randomColor()
  }
});
