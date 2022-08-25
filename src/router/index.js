import {createRouter} from "vue-router/dist/vue-router";
import {createWebHistory} from "vue-router/dist/vue-router";

import ProductsIndex from "../components/products/ProductsIndex.vue";
import ProductsDetails from "../components/products/ProductsDetails.vue";
import Registration from "../components/registration/Registration.vue";
import Login from "../components/auth/Login.vue";
import OrderCreate from "../components/orders/OrderCreate.vue";
import OrdersIndex from "../components/orders/OrdersIndex.vue";

const isNotAuthenticated = (to, from, next) => {
    if (!!localStorage.getItem('user-token')) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/products',
        name: 'products.index',
        component: ProductsIndex
    },
    {
        path: '/products/:id',
        name: 'products.detail',
        props: true,
        component: ProductsDetails
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login
    },
    {
        path: '/orders/create/:id',
        name: 'orders.create',
        props: true,
        component: OrderCreate,
        beforeEnter: isNotAuthenticated,
    },
    {
        path: '/orders',
        name: 'orders.index',
        props: true,
        component: OrdersIndex
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
})