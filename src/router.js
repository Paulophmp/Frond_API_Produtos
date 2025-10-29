import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/produtos',
    name: 'ListarProdutos',
    component: () => import(/* webpackChunkName: "nota" */ './produto/views/ListarProdutos'),
  },
  {
    path: '/produto-cadastrar',
    name: 'CadastrarProduto',
    component: () => import(/* webpackChunkName: "notas" */ './produto/views/CadastrarProduto'),
  },
  {
    path: '/pedidos',
    name: 'ListarPedidos',
    component: () => import(/* webpackChunkName: "Home" */ './pedido/views/ListarPedidos'),
  },
  {
    path: '/pedido-cadastrar',
    name: 'CadastrarPedido',
    component: () => import(/* webpackChunkName: "Home" */ './pedido/views/CadastrarPedido'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuario');

  if (to.name === '/login-again') {
    return next();
  }

  if (to.name === 'home' && !to.params.token) {
    return next('/login-again');
  }

  if (typeof usuario === 'undefined') {
    return next('/login-again');
  }
  console.log('te');

  next();
});

export default router;
