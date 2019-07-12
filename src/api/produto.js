import * as http from './http';

const buildData = (params) => {
  const bodyFormData = new FormData();

  Object.keys(params).forEach((key) => {
    bodyFormData.append(key, params[key]);
  });

  return bodyFormData;
};

export const syncCadastrarProduto = (params) => {
  const path = '/cadastrar-produto';
  return http.postRequest(path, buildData(params));
};

export const syncListarProdutos = function () {
  return http.getRequest('/produto');
};

export const syncExcluirProduto = (id) => {
  const path = '/produto';

  return http.deleteRequest(path, (id));
};

//
// export const syncListarCertificado  = function() {
//     return http.getRequest('/admin/certificados');
// };
//
//
// export const syncEditarCertificado = (params) => {
//     const path = '/admin/certificado';
//
//     return http.putRequest(path, buildData(params), params._id);
// };
