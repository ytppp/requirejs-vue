define(function (require) {
  require('less!./components/menu/style.less');
  var Vue = require('vue');
  const Velocity = require('velocity-animate');
  // 对象数组中是否存在某个值
  const isObjArrHasVal = (
    arr,
    val,
    childNodeName = 'children',
    keyName = 'url'
  ) => {
    return arr.some((item) => {
      if (item[childNodeName]) {
        return isObjArrHasVal(item[childNodeName], val, childNodeName, keyName);
      } else {
        return item[keyName] === val;
      }
    });
  };
  Vue.component('FhMenu', {
    template: require('text!./components/menu/template.html'),
    props: {
      mode: {
        type: String,
        default: 'horizontal',
        validator: function (value) {
          return ['vertical', 'horizontal'].indexOf(value) !== -1;
        },
      },
      active: String,
      activeKeyName: {
        type: String,
        default: 'name',
      },
      backgroundColor: {
        type: String,
        default: '#fff',
      }, // 菜单的背景色 （仅支持 hex 格式）
      textColor: {
        type: String,
        default: '#303133',
      }, // 菜单的文字颜色 （仅支持 hex 格式）
      activeTextColor: {
        type: String,
        default: '#d6001c',
      }, // 当前激活菜单的文字颜色 （仅支持 hex 格式）
      menus: {
        type: Array,
        default: () => [],
      },
      isShowChildMenu: {
        type: Boolean,
        default: true,
      },
      timeout: {
        type: Number,
        default: 200,
      }, // 子菜单显示或关闭延迟时间
    },
    data() {
      return {
        menuList: [],
        timer: null
      };
    },
    watch: {
      menus() {
        this.menuList = this.getMenuList(this.menus);
      },
      active() {
        this.menuList = this.getMenuList(this.menus);
      },
    },
    methods: {
      getMenuList(menus) {
        return this.cleanMenuArr(menus, this.active); // 清理 menus 数据，添加菜单组件需要的参数
      },
      cleanMenuArr(arr, active, childNodeName = 'children', keyName = 'url') {
        return arr.map((item, index) => {
          if (item[childNodeName]) {
            let flag = isObjArrHasVal(
              item[childNodeName],
              active,
              childNodeName,
              keyName
            );
            return {
              ...item,
              showChild: flag, // 是否展开子菜单
              selected: flag, // 是否选中
              children: this.cleanMenuArr(
                item[childNodeName],
                active,
                childNodeName,
                keyName
              ),
            };
          } else {
            return {
              ...item,
              key: index,
              selected: active === item[keyName],
            };
          }
        });
      },
      getColorChannels(color) {
        color = color.replace('#', '');
        if (/^[0-9a-fA-F]{3}$/.test(color)) {
          color = color.split('');
          for (let i = 2; i >= 0; i--) {
            color.splice(i, 0, color[i]);
          }
          color = color.join('');
        }
        if (/^[0-9a-fA-F]{6}$/.test(color)) {
          return {
            red: parseInt(color.slice(0, 2), 16),
            green: parseInt(color.slice(2, 4), 16),
            blue: parseInt(color.slice(4, 6), 16),
          };
        } else {
          return {
            red: 255,
            green: 255,
            blue: 255,
          };
        }
      },
      mixColor(color, percent) {
        let { red, green, blue } = this.getColorChannels(color);
        if (percent > 0) {
          // shade given color
          red *= 1 - percent;
          green *= 1 - percent;
          blue *= 1 - percent;
        } else {
          // tint given color
          red += (255 - red) * percent;
          green += (255 - green) * percent;
          blue += (255 - blue) * percent;
        }
        return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(
          blue
        )})`;
      },
      onMenuMouseEnter(e, menu) {
        this.onMouseEnter(e);
        if (
          menu.hasOwnProperty('showChild') &&
          this.mode === 'horizontal' &&
          this.isShowChildMenu
        ) {
          this.toggleChildMenuVisible(menu, !menu.showChild);
        }
      },
      onMenuMouseLeave(e, menu) {
        this.onMouseLeave(e);
        if (
          menu.hasOwnProperty('showChild') &&
          this.mode === 'horizontal' &&
          this.isShowChildMenu
        ) {
          this.toggleChildMenuVisible(menu, !menu.showChild);
        }
      },
      onMouseEnter(e) {
        if (this.backgroundColor) {
          e.target.style.backgroundColor = this.mixColor(
            this.backgroundColor,
            0.8
          );
        }
      },
      onMouseLeave(e) {
        if (this.backgroundColor) {
          e.target.style.backgroundColor = this.backgroundColor;
        }
      },
      toggleChildMenuVisible(menu, flag) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setChildMenuVisible(menu, flag);
        }, this.timeout);
      },
      setChildMenuVisible(menu, visible) {
        menu.showChild = visible;
      },
      beforeEnter(el) {
        el.style.height = 0;
      },
      enter(el, done) {
        setTimeout(() => {
          let height = 0;
          for (let i = 0; i < el.childElementCount; i++) {
            height += el.children[0].clientHeight;
          }
          Velocity(el, { height: `${height}px` }, { complete: done });
        });
      },
      leave(el, done) {
        setTimeout(() => {
          Velocity(el, { height: 0 }, { complete: done });
        });
      },
      handleClick(menu) {
        if (
          menu.hasOwnProperty('showChild') &&
          this.mode === 'vertical' &&
          this.isShowChildMenu
        ) {
          this.toggleChildMenuVisible(menu, !menu.showChild);
        } else {
          this.$emit('click', menu);
        }
      },
    },
    mounted() {
      this.menuList = this.getMenuList(this.menus);
    },
  });
});
