import Vue from 'vue';
import VueRouter from 'vue-router';
import ComponentsList from "../src/components/ComponentsList";

Vue.use(VueRouter);

const routes = [
    {
        path: '/:category',
        component: ComponentsList
    },
    {
        path: '*',
        component: ComponentsList
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes
});
