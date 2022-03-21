/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Dashboard from '@/views/workbench/dashboard.vue'
import pic2 from '@/views/pic/pic2.vue'
import pic1 from '@/views/pic/pic1.vue'
import pic3 from "../views/pic/pic3";
import pic4 from "../views/pic/pic4";
import pic4Subitem1 from "../views/pic/pic4Subitem/pic4Subitem1";
import pic4Subitem2 from "../views/pic/pic4Subitem/pic4Subitem2";
// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      type: 'home',
      name: 'home',
      component: Home,
      redirect:'/dashboard',
      children: [
        {
          path: '/dashboard',
          name: '首页',
          components: {
            default: Dashboard,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/pic1',
          components: {
            default: pic1,
            top: TopNav,
            aside: LeftNav
          },
          name: '可调度潜力评估',
          iconCls: 'el-icon-menu',
          leaf: true, // 只有一个节点
          menuShow: true

        },
        {
          path: '/pic2',
          components: {
            default: pic2,
            top: TopNav,
            aside: LeftNav
          },
          name: '充电负荷预测',
          iconCls: 'el-icon-menu',
          leaf: true, // 只有一个节点
          menuShow: true

        },
        {
          path: '/pic3',
          components: {
            default: pic3,
            top: TopNav,
            aside: LeftNav
          },
          name: '智能聚合响应',
          iconCls: 'el-icon-menu',
          leaf: true, // 只有一个节点
          menuShow: true

        },
        {
          path: '/pic4',
          components: {
            default: pic4,
            top: TopNav,
            aside: LeftNav
          },
          name: '协同优化调度',
          iconCls: 'el-icon-menu',
          leaf:false,
          menuShow: true,
          children:
          [{
            path: '/pic4/pic4Subitem1',
            components: {
              default: pic4Subitem1,
              top: TopNav,
              aside: LeftNav
            },
            name: '协同优化调度子项1',
            menuShow: true
          },
            {
              path: '/pic4/pic4Subitem2',
              components: {
                default: pic4Subitem2,
                top: TopNav,
                aside: LeftNav
              },
              name: '协同优化调度子项2',
              menuShow: true
            }]

        }

      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // console.log('to:' + to.path)
//   if (to.path.startsWith('/login')) {
//     window.localStorage.removeItem('access-user')
//     next()
//   } else {
//     let user = JSON.parse(window.localStorage.getItem('access-user'))
//     if (!user) {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }
// });

export default router
