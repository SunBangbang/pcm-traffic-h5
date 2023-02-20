/*
 * @Author: your name
 * @Date: 2022-02-15 13:20:53
 * @LastEditTime: 2022-03-31 18:28:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lspcp-sc\src\main.js
 */
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import request from '@/utils/request';
import EnvProvider from 'jvjr-docker-env'
import uView from "uview-ui";
import {showMessage} from '@/utils/message'
import store from './store'
import bus from '@/utils/bus'
//配置公共方法
import noclick  from './common/noclick.js'


Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$msg = showMessage
Vue.prototype.$request = request
Vue.prototype.$moment = moment
Vue.prototype.$Env = EnvProvider
Vue.prototype.$bus=bus

Vue.prototype.$noMultipleClicks = noclick.noMultipleClicks


App.mpType = 'app'
uni.$u.config.unit = 'rpx'

const app = new Vue({
  store,
  ...App
})
app.$mount()
