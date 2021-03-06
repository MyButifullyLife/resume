/**
 * @file 路由
 * @author bigger <1142829292@qq.com>
 * @since 1.0.1
 * @version 1.0.0 - 2018/9/4
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
	{
		path: '/',
		component: ()=>import('../pages/home.vue')
	}
];
// 为了能够正确执行转场动画，跳转页面的方法需要做一层包装
VueRouter.prototype.$go = function (noAnimate) {
	this.noAnimate = noAnimate || false;
	this.goTo = false;
	this.go(-1);
};
VueRouter.prototype.$push = function (location, noAnimate, onComplete, onAbort) {
	this.noAnimate = noAnimate || false;
	this.goTo = true;
	this.push(location, onComplete, onAbort);
};
VueRouter.prototype.$replace = function (location, noAnimate, onComplete, onAbort) {
	this.noAnimate = noAnimate || false;
	this.goTo = true;
	this.replace(location, onComplete, onAbort);
};

Vue.use(VueRouter);

const Router = new VueRouter({
  routes
});


export default Router;
