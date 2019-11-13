import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import {emptyTextFilter} from '@/utils/filters'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, {
    size: 'mini',
    i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.filter('emptyTextFilter', emptyTextFilter)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
