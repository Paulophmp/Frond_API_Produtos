import Vue from 'vue';
import Vuex from 'vuex';
import global from './store/global/index';
import nota from './store/nota/index';
import produto from './store/produto/index';
import pedido from './store/pedido/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    nota,
    produto,
    pedido,
  },
  debug: true,
});
