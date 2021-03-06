import vue from 'vue';
import * as types from './types';

export const state = {
  listarPedidos: [],
};

export const mutations = {
  [types.SYNC_LISTAR_PEDIDOS](state, params) {
    state.listarPedidos = params;
  },
  [types.SYNC_EXCLUIR_PEDIDO](state, certificadoId) {
    state.listarProdutos.find((certificado, index) => {
      if (certificado._id === certificadoId) {
        return state.listarProdutos.splice(index, 1);
      }
    });
  }
};
