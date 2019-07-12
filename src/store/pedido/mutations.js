import vue from 'vue';
import * as types from './types';

export const state = {
  listarPedidos: [],
};

export const mutations = {
  [types.SYNC_LISTAR_PEDIDOS](state, params) {
    state.listarPedidos = params;
  },
};
