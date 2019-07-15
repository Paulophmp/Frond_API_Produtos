import Vue from 'vue';
import Vuex from 'vuex';
import money from 'v-money';
import global from './store/global/index';
import nota from './store/nota/index';
import produto from './store/produto/index';
import pedido from './store/pedido/index';

Vue.use(money, { precision: 4 });

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
