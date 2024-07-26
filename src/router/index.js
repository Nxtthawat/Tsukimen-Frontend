import { createRouter, createWebHistory } from "vue-router";
import loginView from '../views/login.vue';
import registerView from '../views/register.vue';
import chatView from '../views/chat.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue")
        },
        {
            path: "/login",
            name: "login",
            component: loginView
        },
        {
            path: "/register",
            name: "register",
            component: registerView
        },
        {
            path: "/chat",
            name: "chat",
            component: chatView
        }
    ]
});

router.beforeEach((to, _, next) => {
    if(to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('token')) {
        next({ name: 'login' });
    }else if( (to.name === 'login' || to.name === 'register') && localStorage.getItem('token')){
        next({ name: 'Home' });
    } else{
        next();
    };
});

export default router;