import { createRouter, createWebHistory } from 'vue-router';
import BasicLayout from '@/layouts/index.vue';
// import BlankLayout from '@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/app',
    },
    {
        path: '/app',
        name: 'app',
        component: BasicLayout,
        redirect: '/app/edit',
        children: [
            {
                path: '/app/edit',
                component: () => import('@/views/home/index.vue'),
                name: 'edit',
                meta: {
                    title: '编辑',
                    auth: ['home'],
                },
            },
            // {
            //     path: '/app/data/geo',
            //     name: 'geo',
            //     component: () => import('@/views/data/personal/geo/index.vue'),
            //     meta: { title: '空间数据集', keepAlive: true, breadcrumb: true },
            // },
            // {
            //     path: '/app/data/model',
            //     name: 'model',
            //     component: () => import('@/views/data/personal/model/index.vue'),
            //     meta: { title: '3D模型', keepAlive: true, breadcrumb: true },
            // },
            // {
            //     path: '/app/data/service',
            //     name: 'service',
            //     component: () => import('@/views/data/service/index.vue'),
            //     meta: { title: '数据服务（发布）', keepAlive: true, breadcrumb: true },
            // },
            // {
            //     path: '/app/data/enhance',
            //     name: 'enhance',
            //     component: () => import('@/views/data/enhance/index.vue'),
            //     meta: { title: '数据分析', keepAlive: true, breadcrumb: true },
            // },

        ],
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
    // {
    //     path: '/404',
    //     component: () => import('@/views/404.vue'),
    // },
];

// export const publicRoutes = [
//     {
//         path: '/redirect',
//         component: BlankLayout,
//         children: [
//             {
//                 path: '/redirect/:path(.*)',
//                 component: () => import('@/views/redirect/index'),
//             },
//         ],
//     },

// ];




// app router
export const router = createRouter({
    // 解决 二级路径存在时，路径地址路由不匹配的问题
    // https://juejin.cn/post/7051826951463370760#heading-27
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});
