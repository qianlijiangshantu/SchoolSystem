import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VueAxios from 'vue-axios'


import './element/element.js'


Vue.config.productionTip = false
Vue.use(VueCookie)
Vue.use(VueAxios, axios)

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requireAuth)) {
//         document.title = to.meta.title
//     }
//     next()
// })

// router.beforeEach(function (to, from, next)  {
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     // next()
//     if (to.path === '/') {
//         next();
//     } else {
//         //无登录状态,跳转到login页面
//         let token = Vue.prototype.$cookie.get("token");
//         if (token) {
//             next();
//         } else {
//             next({
//                 path: '/'    //无登录状态,跳转到home页面
//             })
//         }
//     }
// })
router.beforeEach(function (to, from, next) {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    var array = ['/', '/register', '/login', '/logout'];
    if (array.includes(to.path)) {
        next()
    } else {
        //无登录状态,跳转到login页面
        let token = Vue.prototype.$cookie.get("token");
        let teacher = Vue.prototype.$cookie.get("teacher");

        // let token = sessionStorage.getItem("token");
        // let teacher = sessionStorage.getItem("teacher");
        // let token = localStorage.getItem("token");
        // let teacher = localStorage.getItem("teacher");
        if (token) {
            //  if(teacher=="false"){
            if ((JSON.parse(teacher) == false) && to.path == '/student') {
                next();
            } else if ((JSON.parse(teacher) == true) && to.path == '/teacher'||to.path=='/teacher/add_homework'||to.path=='/teacher/homework_list') {
                next();
            } else {
                next({
                    path: '/'    //无登录状态,跳转到home页面
                })
            }
        } else {
            next({
                path: '/'    //无登录状态,跳转到home页面
            })
        }
    }
})

//     if (to.path === '/student') {
//         let tokk = { token: Vue.prototype.$cookie.get('token') }
//         if (tokk) {
//             next();
//         } else {
//             next("/");
//         }
//     } else {
//         next();
//     }

// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router/router'
// import axios from 'axios'
// import VueCookie from 'vue-cookie'
// import VueAxios from 'vue-axios'

// import './element/element.js'

// Vue.config.productionTip = false
// Vue.use(VueCookie)
// Vue.use(VueAxios, axios)

// router.beforeEach(function (to, from, next)  {
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     var paths=['/','/register','/login']
//     if (paths.includes(to.path)) {
//             next();
//     } else {
//         //无登录状态,跳转到login页面
//         let token = Vue.prototype.$cookie.get("token");
//         let teacher = Vue.prototype.$cookie.get("teacher");
//         if (token) {
//             if((JSON.parse(teacher)==false) && to.path=='/student') {
//                     next();
//             }else if((JSON.parse(teacher)==true) && (to.path=='/teacher' || to.path=='/teacher/add_homework'|| to.path=='/teacher/homework_list')){
//                 next();
//             }else
//             {
//                 next({
//                     path: '/'    //无登录状态,跳转到home页面
//                 })
//             }
//         } else {
//             next({
//                 path: '/'    //无登录状态,跳转到home页面
//             })
//         }
//     }
// })

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')