import * as types from './types';
import * as api from '@/api/pedido';

export const listarPedidosAction = ({ commit }) => {
  api.syncListarPedidos()
    .then((response) => {
      const { data } = response;
      commit(types.SYNC_LISTAR_PEDIDOS, data);
    }).catch((e) => {
      // console.log(e)
      // throw new TypeError(e, 'error', 10);
    });
};

// export const excluirProdutosAction = async ({ commit }, id) => {
//   console.log(id);
//   const result = await api.syncExcluirProduto(id)
//     .then(() => {
//       commit(types.SYNC_EXCLUIR_PRODUTO, id);
//     }).catch((e) => {
//       // console.log(e)
//       // throw new TypeError(e, 'error', 10);
//     });
//   return result;
// };
//
// export const cadastrarProdutosAction = async ({ commit }, params) => {
//   await api.syncCadastrarProduto(params)
//     .then((response) => {
//       const { data } = response;
//       commit(types.SYNC_CADASTRAR_PRODUTO, data);
//     }).catch((e) => {
//       // console.log(e)
//       // throw new TypeError(e, 'error', 10);
//     });
// };
