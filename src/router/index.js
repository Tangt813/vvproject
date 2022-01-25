/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Dashboard from '@/views/workbench/dashboard.vue'
import MySettings from '@/views/workbench/mySettings.vue'
import Mission from '@/views/workbench/mission/mission.vue'
import Plan from '@/views/workbench/plan/plan.vue'
import Maillist from '@/views/workbench/maillist.vue'
import EnterpriseList from '@/views/enterprise/index.vue'
import EnterpriseAdd from '@/views/enterprise/add.vue'
import EnterpriseDetail from '@/views/enterprise/detail.vue'
import EnterpriseValidate from '@/views/enterprise/validate.vue'
import VehicleManage from '@/views/vehicle/index.vue'
import DeptManager from '@/views/dept/index.vue'
import NotFound from '@/components/404.vue'
import pic2 from '@/views/pic/pic2.vue'
import pic1 from '@/views/pic/pic1.vue'
import pic3 from "../views/pic/pic3";
import pic4 from "../views/pic/pic4";
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/dashboard',
      component: Home,
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
          leaf: true, // 只有一个节点
          menuShow: true

        }

      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router
