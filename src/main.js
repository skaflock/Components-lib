import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery/dist/jquery.slim.min'
window.jQuery = jQuery;
window.$ = jQuery;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
});
