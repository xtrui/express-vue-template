import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import editor2 from "../views/Editor";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/editor2',
        name: 'editor2',
        component: editor2
    },
    {
        path: '/test',
        name: 'test'
    },
    {
        path: '/test2',
        name: 'test2'
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
