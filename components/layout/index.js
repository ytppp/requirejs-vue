define(function (require) {
  require('fh-header');
  require('fh-footer');
  var Vue = require('vue');
  const Velocity = require('velocity-animate');
  var { getMenu } = require('menu');
  const $ = require('jquery');

  // 若多维对象数组中存在某个值，返回其顶级对象
  const getTopObjFromObjArr = (
    arr,
    val,
    childNodeName = 'children',
    keyName = 'url'
  ) => {
    return arr.find((item) => {
      if (item[childNodeName]) {
        return getTopObjFromObjArr(
          item[childNodeName],
          val,
          childNodeName,
          keyName
        );
      } else {
        return item[keyName] === val;
      }
    });
  };
  // 返回多维对象数组不存在children的第一个对象
  const getObjFromObjArr = (
    arr,
    childNodeName = 'children',
    keyName = 'url'
  ) => {
    let menu = null;
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item[childNodeName]) {
        return getObjFromObjArr(item[childNodeName], childNodeName, keyName);
      } else {
        return (menu = item);
      }
    }
    return menu;
  };
  Vue.component('FhLayout', {
    template: require('text!./components/layout/template.html'),
    props: {
      url: {
        type: String,
        default: location.pathname.replaceAll(/(^\/cgi-bin)|(.asp$)/g, ''),
      },
      title: String,
      isStopRefresh: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        layoutMainMarginTop: 30,
        layoutHeaderHeight: 70,
        asideBgColor: '#DDDDDD'
      }
    },
    computed: {
      isShow() {
        return ['/login', '/guide'].includes(this.url);
      },
      hasChildPage() {
        return this.childMenus.length > 0;
      },
      menus() {
        return getMenu();
      },
      childMenus() {
        let arr = getTopObjFromObjArr(this.menus, this.url);
        if (arr && arr.children) {
          return arr.children;
        } else {
          return [];
        }
      },
      layoutAsideTop() {
        return this.layoutMainMarginTop + this.layoutHeaderHeight
      }
    },
    methods: {
      handleMenuItemClick(menuObj) {
        let menu = null;
        if (menuObj.children) {
          menu = getObjFromObjArr(menuObj.children);
        } else {
          menu = menuObj;
        }
        window.location.href = `/cgi-bin${menu.url}.asp`;
      },
      setHeight() {
        const contentMinHeight = 600; // 定义内容区域最小高度
        const height = Math.max(document.body.clientHeight, contentMinHeight);
        this.$refs.layout.style.minHeight = `${height}px`;
        if (this.$refs.layoutAside) {
          const height = document.body.clientHeight - this.$refs.layoutHeader.$el.offsetHeight - this.layoutMainMarginTop;
          this.$refs.layoutAside.style.maxHeight = `${height}px`;
        }
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
        this.childList.forEach((l) => {
          if (l !== menu) {
            l.selected = false;
          }
        });
        menu.selected = !menu.selected;
      },
      refresh() {
        if (this.isShow || this.isStopRefresh) {
          return;
        }
        $.ajax({
          url: '/cgi-bin/refresh.asp',
          type: 'get',
          error: (xhr) => {
            if (xhr.status = 400) {
              window.location.href = '/#/login'; // http://127.0.0.1:8080/#/login
            }
          },
          success: () => {
            setTimeout(() => {
              this.refresh()
            }, 5000);
          }
        })
      },
    },
    mounted() {
      // this.refresh();
      this.setHeight();
      window.addEventListener('resize', () => {
        this.setHeight();
      });
    },
  });
});
