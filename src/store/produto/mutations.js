import vue from 'vue';
import * as types from './types';

export const state = {
  listarProdutos: [],
  cadastrarProdutos: [],
};

export const mutations = {
  [types.SYNC_CADASTRAR_PRODUTO](state, params) {
    state.cadastrarProdutos = params;
    localStorage.setItem('cadastrarProdutos', JSON.stringify(params));
  },
  [types.SYNC_LISTAR_PRODUTOS](state, params) {
    state.listarProdutos = params;
  },
  [types.SYNC_EXCLUIR_PRODUTO](state, certificadoId) {
    state.listarProdutos.find((certificado, index) => {
      if (certificado._id === certificadoId) {
        return state.listarProdutos.splice(index, 1);
      }
    });
  },
};
