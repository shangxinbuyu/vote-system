import Layout from '@/layout/Index.vue'
import Login from '@/views/login/Index.vue'
import Register from '@/views/register/Index.vue'

import VoteList from '@/views/voteList/Index.vue'

export const constantRouter = [
    {
        name: 'VotingManagement',
        path: '/',
        component: Layout,
        redirect: '/vote-list',
        meta: {
            title: '投票管理',
            hidden: false,
            icon: 'Grid'
        },
        children: [
            {
                name: 'VoteList',
                path: '/vote-list',
                component: VoteList,
                meta: {
                    title: '投票列表',
                    hidden: false,
                    icon: 'Edit'
                }
            }
        ]
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            hidden: true
        },
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
        meta: {
            hidden: true
        },
    }
]