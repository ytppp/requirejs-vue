define(function (require) {
  require('less!./components/menu/style.less');
  var Vue = require('vue');
  const Velocity = require('velocity-animate');
  Vue.component('FhMenu', {
    template: require('text!./components/menu/template.html'),
    props: {
      mode: {
        type: String,
        default: 'vertical'
      },
      active: String,
      activeKeyName: {
        type: String,
        default: 'name'
      },
      menus: []
    },
    data() {
      return {
        menuList: []
      };
    },
    watch: {
      menus() {
        this.menuList = this.getMenuList(this.menus);
      },
      active() {
        this.menuList = this.getMenuList(this.menus);
      }
    },
    methods: {
      getMenuList(menus) {
        return menus.map((m, index) => {
          m.key = index;
          if (m.children && m.children.length) {
            return {
              ...m,
              showChild: false, // this.isSonSelected(m.children),
              children: getList(m.children)
            };
          } else {
            return { ...m, selected: this.active === m[this.activeKeyName] };
          }
        });
      }, 
      isSonSelected(menu, active) {
        menu.map(m=> {
          if (m.children) {
            return {
              ...m,
              children:
            }
          }
        });
      },
      beforeEnter(el) {
        el.style.height = 0;
      },
      enter(el, done) {
        setTimeout(() => {
          const height = el.childElementCount * 38;
          Velocity(el, { height: `${height}px` }, { complete: done });
        });
      },
      leave(el, done) {
        setTimeout(() => {
          Velocity(el, { height: 0 }, { complete: done });
        });
      },
      showMobileMenu(menu) {
        this.childList.forEach(l => {
          if (l !== menu) {
            l.selected = false;
          }
        });
        menu.selected = !menu.selected;
      }
    }
  });
});
