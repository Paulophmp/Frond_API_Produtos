import * as http from './http';


export const syncListarPedidos = function () {
  return http.getRequest('/pedidos');
};

export const syncExcluirPedido = (id) => {
  const path = '/pedido';

  return http.deleteRequest(path, (id));
};

// export const syncNotasByUser = function (params) {
//   return http.getRequest(`/nfe/listar-notas/${params}`);
// };
//
// export const syncNota = id => http.getRequest(`/nfe/buscar-notas/${id}`);
