import * as types from './types';
import * as api from '@/api/produto';

export const listarProdutosAction = ({ commit }) => {
  api.syncListarProdutos()
    .then((response) => {
      const { data } = response;
      commit(types.SYNC_LISTAR_PRODUTOS, data);
    }).catch((e) => {
    });
};

export const excluirProdutosAction = async ({ commit }, id) => {
  console.log(' produto', id);
  const result = await api.syncExcluirProduto(id)
    .then(() => {
      commit(types.SYNC_EXCLUIR_PRODUTO, id);
    }).catch((e) => {
    });
  return result;
};

export const cadastrarProdutosAction = async ({ commit }, params) => {
  await api.syncCadastrarProduto(params)
    .then((response) => {
      const { data } = response;
      commit(types.SYNC_CADASTRAR_PRODUTO, data);
    }).catch((e) => {
      // console.log(e)
      // throw new TypeError(e, 'error', 10);
    });
};
