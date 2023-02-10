define(function (require) {
  var Vue = require('vue');
  var VueRouter = require('vue-router');

  var loader = deps => {
    return () => {
      if (!Array.isArray(deps)) {
        deps = [deps];
      }
      return new Promise((resolve, reject) => {
        require(deps, function (res) {
          resolve(res);
        });
      });
    };
  };

  var routes = [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: loader('pages/login/index')
    },
    {
      path: '/home',
      name: 'home',
      component: loader('pages/home/index')
    }
  ];

  let router = new VueRouter({
    routes
  });

  Vue.use(VueRouter);
  return router;
});
