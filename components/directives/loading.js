define(function (require) {
  var Vue = require('vue');
  const LoadingCom = require('fh-loading-com');
  const target = "loadingTarget";
  let position = '';
  let instance = null;
  function appendNode(el) {
    position = el.style.position;
    el.style.position = 'relative';
    el.appendChild(el[target]);
  }
  function removeNode(el) {
    if (instance) {
      instance.visible = false;
      instance = null;
    }
    el.style.position = position;
    el.removeChild(el[target]);
  }
  Vue.directive('loading', {
    inserted(el, bing) {
      const tip = el.getAttribute("loading-tip");
      const title = el.getAttribute("loading-title");
      instance = new LoadingCom({
        data: {
          tip: tip || '',
          title: title || '',
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
