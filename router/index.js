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
      redirect: '/display'
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
    },
    {
      path: '/display',
      name: 'display',
      component: loader('pages/display/index')
    },
    {
      path: '/other',
      name: 'other',
      component: loader('pages/other/index')
    },
    {
      path: '/control',
      name: 'control',
      component: loader('pages/control/index')
    },
    {
      path: '/guide',
      name: 'guide',
      component: loader('pages/guide/index')
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: loader('pages/echarts/index')
    }
  ];

  let router = new VueRouter({
    routes
  });

  Vue.use(VueRouter);
  return router;
});
