import 'babel-polyfill';
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './route/index.js';
import store from './store'
import App from './App.vue';
import baseVue from './pages/base/base.page.vue'
require(['./utils/flexible.js']);
import {
  toast,
  hideToast
} from './components/toast/toast.js';
import {hasClass, addClass, removeClass} from './js/utils';
import {eventBus} from './js/eventBus';
window.echarts = require('./utils/echarts.min').echarts;
require(['./utils/jQuery.js']); //引用jQuery
require(['./utils/Boom.js']); // 需要依赖 jQuery
/**
 *  vconsole 需要直接打开
 * */
// import vConsole from 'vconsole';
// let consoleTest = new vConsole();
/**
 *  全局 $toast
 * */
Vue.prototype.$toast = function (text, time) {
  toast(text, time)
};
Vue.prototype.$hideToast = function () {
  hideToast()
};
/**
 *  全局eventBUs
 * */
Vue.prototype.$eventBus = eventBus;
/**
 *  FastClick
 * */
FastClick.attach(document.body);

/**
 *  mixin 公共方法
* */
Vue.mixin(baseVue)

/**
 *
 * */

window.imgPosition = function(imgDom){
  console.log(getComputedStyle(imgDom.parentNode).width)
  if(imgDom.naturalHeight > imgDom.naturalWidth){
        imgDom.style.width ='100%';
  }else {
    imgDom.style.height ='100%';
  }
}

/**
 *  注册全局点击，点击对象赋上class，优化体验
 * */
Vue.directive('touchBg', {
  inserted: function (el) {
    console.log(el)
    el.addEventListener('touchstart', (e) => {
      addClass(el, 'actived-bg');
    });
    el.addEventListener('touchend', (e) => {
      removeClass(el, 'actived-bg');
    });
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
