import * as http from './http';

const buildData = (params) => {
  const bodyFormData = new FormData();

  Object.keys(params).forEach((key) => {
    bodyFormData.append(key, params[key]);
  });

  return bodyFormData;
};

export const syncListarPedidos = function () {
  return http.getRequest('/pedidos');
};

export const syncExcluirPedido = (id) => {
  const path = '/pedido';

  return http.deleteRequest(path, (id));
};

export const syncCadastrarPedido = (params) => {
  const path = '/cadastrar-pedido';
  return http.postRequest(path, buildData(params));
};

// export const syncNotasByUser = function (params) {
//   return http.getRequest(`/nfe/listar-notas/${params}`);
// };
//
// export const syncNota = id => http.getRequest(`/nfe/buscar-notas/${id}`);
