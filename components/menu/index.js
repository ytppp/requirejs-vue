define(function (require) {
  var Vue = require('vue');
  require('fh-icon');
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
  const Mode = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  };
  Vue.component('FhMenu', {
    template: require('text!./components/menu/template.html'),
    props: {
      mode: {
        type: String,
        default: Mode.horizontal,
        validator: function (value) {
          return [Mode.vertical, Mode.horizontal].indexOf(value) !== -1;
        },
      },
      active: String,
      activeKeyName: {
        type: String,
        default: 'name',
      },
      menus: {
        type: Array,
        default: () => [],
      },
      isShowChildMenu: {
        type: Boolean,
        default: true,
      }, // 是否显示子菜单
      timeout: {
        type: Number,
        default: 200,
      }, // 子菜单显示或关闭延迟时间
      fontSize: {
        type: String,
        default: '18px'
      },
      childMenuFontSize: String,
      backgroundColor: {
        type: String,
        default: '#fff'
      }, // 菜单的背景色 （仅支持 hex 格式）
      textColor: {
        type: String,
        default: '#303133',
      }, // 菜单的文字颜色 （仅支持 hex 格式）
      hoverTextColor: String, // 鼠标hover菜单的文字颜色 （仅支持 hex 格式）
      hoverBackgroundColor: String, // 鼠标hover菜单的背景色 （仅支持 hex 格式）
      hoverChildMenuTextColor: String, // 鼠标hover子菜单的文字颜色 （仅支持 hex 格式）
      hoverChildMenuBackgroundColor: String, // 鼠标hover子菜单的背景色 （仅支持 hex 格式），不设置此项是使用 hoverBackgroundColor
      activeTextColor: String, // 激活菜单的文字颜色 （仅支持 hex 格式）
      activeBackgroundColor: String, // 激活菜单的背景颜色 （仅支持 hex 格式）
      activeChildMenuTextColor: String, // 激活子菜单的文字颜色 （仅支持 hex 格式），不设置此项是使用 activeTextColor
      activeChildMenuBackgroundColor: String, // 激活子菜单的背景颜色 （仅支持 hex 格式），不设置此项是使用 activeBackgroundColor
      isEnlargeFontSize: {
        type: Boolean,
        default: false,
      }, // hover或激活时是否放大文本
      accordion: {
        type: Boolean,
        default: true,
      } // 是否开启手风琴效果
    },
    data() {
      return {
        Mode,
        menuList: [],
        timer: null,
        prevMenu: null
      };
    },
    computed: {
      isHorizontal() {
        return this.mode === Mode.horizontal;
      },
      isVertical() {
        return this.mode === Mode.vertical;
      },
      menuObj() {
        return {
          fontSize: this.fontSize,
          backgroundColor: this.backgroundColor
        }
      },
      childMenuFontSizeCom() {
        return this.childMenuFontSize ? this.childMenuFontSize : this.fontSize;
      }
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
            let menuCleaned = {
              ...item,
              showChild: flag, // 是否展开子菜单
              selected: flag, // 是否选中
              hovered: false,
              children: this.cleanMenuArr(
                item[childNodeName],
                active,
                childNodeName,
                keyName
              ),
            };
            if (flag && this.accordion && this.isVertical) {
              this.prevMenu = menuCleaned;
            }
            return menuCleaned;
          } else {
            return {
              ...item,
              key: index,
              selected: active === item[keyName],
              hovered: false
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
        this.onMouseEnter(e, menu);
        if (
          menu.hasOwnProperty('showChild') &&
          this.isHorizontal &&
          this.isShowChildMenu
        ) {
          this.toggleChildMenuVisible(menu, !menu.showChild);
        }
      },
      onMenuMouseLeave(e, menu) {
        this.onMouseLeave(e, menu);
        if (
          menu.hasOwnProperty('showChild') &&
          this.isHorizontal &&
          this.isShowChildMenu
        ) {
          this.toggleChildMenuVisible(menu, !menu.showChild);
        }
      },
      onMouseEnter(e, menu) {
        if (menu.selected) {
          return;
        }
        menu.hovered = true;
        if (menu.children) {
          if (this.hoverBackgroundColor) {
            e.target.style.backgroundColor = this.hoverBackgroundColor;
          } else {
            e.target.style.backgroundColor = this.mixColor(
              this.backgroundColor,
              0.8
            );
          }
          this.hoverTextColor && (e.target.style.color = this.hoverTextColor);
        } else {
          if (this.hoverChildMenuBackgroundColor || this.hoverBackgroundColor) {
            e.target.style.backgroundColor = this.hoverChildMenuBackgroundColor || this.hoverBackgroundColor;
          } else {
            e.target.style.backgroundColor = this.mixColor(
              this.backgroundColor,
              0.8
            );
          }
          if (this.hoverChildMenuTextColor || this.hoverTextColor) {
            e.target.style.color = this.hoverChildMenuTextColor || this.hoverTextColor;
          }
        }
      },
      onMouseLeave(e, menu) {
        if (menu.selected) {
          return;
        }
        menu.hovered = false;
        e.target.style.color = this.textColor;
        e.target.style.backgroundColor = this.backgroundColor;
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
          this.isVertical &&
          this.isShowChildMenu
        ) {
          if (this.accordion) {
            if (!this.prevMenu) {
              this.toggleChildMenuVisible(menu, !menu.showChild);
            } else {
              if (this.prevMenu == menu) {
                this.toggleChildMenuVisible(menu, !menu.showChild);
              } else {
                this.setChildMenuVisible(this.prevMenu, false);
                this.toggleChildMenuVisible(menu, true);
              }
            }
            this.prevMenu = menu;
          } else {
            this.toggleChildMenuVisible(menu, !menu.showChild);
          }
        } else {
          this.$emit('click', menu);
        }
      },
      getMenuStyleObj(menu) {
        return {
          backgroundColor: menu.selected && this.activeBackgroundColor ? this.activeBackgroundColor : this.backgroundColor,
          color: menu.selected && this.activeTextColor ? this.activeTextColor : this.textColor
        }
      },
      getChildMenuStyleObj (menu) {
        let activeBackgroundColor = '';
        let activeTextColor = '';
        if (this.activeChildMenuBackgroundColor) {
          activeBackgroundColor = this.activeChildMenuBackgroundColor;
        } else if (this.activeBackgroundColor) {
          activeBackgroundColor = this.activeBackgroundColor;
        }
        if (this.activeChildMenuTextColor) {
          activeTextColor = this.activeChildMenuTextColor;
        } else if (this.activeTextColor) {
          activeTextColor = this.activeTextColor;
        }
        return obj = {
          backgroundColor: menu.selected && activeBackgroundColor ? activeBackgroundColor : this.backgroundColor,
          color: menu.selected && activeTextColor ? activeTextColor : this.textColor
        };
      }
    },
    mounted() {
      this.menuList = this.getMenuList(this.menus);
    },
  });
});
