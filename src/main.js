import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../store/store'
import 'highlight.js/styles/darcula.css';
import VueHighlightJS from 'vue-highlightjs';
import {router} from "../routes/route";

Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});
