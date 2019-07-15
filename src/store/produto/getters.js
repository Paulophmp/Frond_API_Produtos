export const listarProdutosGetter = state => state.listarProdutos;
export const leanListarProdutosGetter = state => state.listarProdutos.map(item => item.nome);
// export const leanListarProdutosGetter = state => state.listarProdutos.map(item => [item.nome, item.quantidadeEstoque]);
export const excluirProdutoGetter = state => state.excluirProduto;
export const cadastrarProdutoGetter = state => state.cadastrarProdutos;
