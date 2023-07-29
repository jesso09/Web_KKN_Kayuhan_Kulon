//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/LoginPage.vue'),
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/HomePage.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/components/tentangPadukuhan.vue'),
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('@/components/daftarKegiatan.vue'),
    },
    {
        path: '/tesFoto',
        name: 'tesFoto',
        component: () => import('@/components/tesFoto.vue'),
    },
    {
        path: "/detail:id",
        name: "detail_post",
        component: () => import('@/components/detailPost.vue'),
    },
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;