define(function (require) {
  require('less!./components/layout/style.less');
  require('fh-header');
  require('fh-footer');
  var Vue = require('vue');
  const Velocity = require('velocity-animate');
  var { getMenu } = require('menu');
  Vue.component('FhLayout', {
    template: require('text!./components/layout/template.html'),
    props: {
      url: {
        type: String,
        default: location.pathname.replaceAll(/(^\/cgi-bin)|(.asp$)/g, '')
      },
      title: String
    },
    computed: {
      isShow() {
        return ['/login'].includes(this.url);
      },
      hasChildPage() {
        return ![
          '/login',
          '/home',
          '/internet',
          '/wifi',
          '/devicecontrol'
        ].includes(this.url);
      },
    },
    data () {
      return {
        list: [],
        childList: []
      };
    },
    methods: {
      getList() {
        const menus = getMenu();
        this.list = menus.map((menu, index) => {
          return {
            ...menu,
            key: index,
            selected:
              this.url === menu.url ||
              (menu.children &&
                menu.children.length &&
                menu.children.find(cMenu => cMenu.url === this.url))
          };
        });
        let children = this.list.find(
          menu =>
            menu.children &&
            menu.children.length &&
            menu.children.find(cMenu => cMenu.url === this.url)
        ).children;
        this.childList = children.map((menu, index) => {
          return {
            ...menu,
            key: index,
            selected:
              this.url === menu.url ||
              (menu.children &&
                menu.children.length &&
                menu.children.find(cMenu => cMenu.url === this.url))
          };
        });
      },
      setHeight() {
        const contentMinHeight = 600; // 定义内容区域最小高度
        let height = 0;
        if (document.body.clientHeight > contentMinHeight) {
          height = document.body.clientHeight;
        } else {
          height = contentMinHeight;
        }
        this.$refs.layout.style.minHeight = `${height}px`;
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
    },
    mounted() {
      this.getList();
      this.setHeight();
      window.addEventListener('resize', () => {
        this.setHeight();
      });
    }
  });
});
