define(function (require) {
  var Vue = require('vue');
  const LoadingCom = require('fh-loading-com');
  const target = "loadingTarget";
  let position = '';
  function appendNode(el) {
    position = el.style.position;
    el.style.position = 'relative';
    el.appendChild(el[target]);
  }
  function removeNode(el) {
    el.style.position = position;
    el.removeChild(el[target]);
  }
  Vue.directive('loading', {
    inserted(el, bing) {
      const tip = el.getAttribute("loading-tip");
      const instance = new LoadingCom({
        data: {
          tip: tip || '',
          isAppendBody: false
        }
      }).$mount();
      instance.visible = true;
      el[target] = instance.$el;
      if (bing.value) {
        appendNode(el);
      }
    },
    update(el, bing) {
      if (bing.value !== bing.oldValue) {
        bing.value ? appendNode(el) : removeNode(el);
      }
    }
  });
});
