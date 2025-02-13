import {createRouter, createWebHistory} from 'vue-router'

import {constantRouter} from './router.ts'

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter
})


export default router