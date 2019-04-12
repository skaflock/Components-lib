import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: [],
        currentCategory: '',
        currentComponents: [],
        component: {},
        componentHtml: null,
        componentScss: null,
        componentJs: null,
        componentHtmlUrl: null
    },
    mutations: {
        loadCategories(state, categories) {
            state.categories = categories;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
        },
        loadCurrentComponents(state, components) {
            state.currentComponents = components;
        },
        loadComponent(state, component) {
            state.component = component;
        },
        loadComponentHtml(state, html) {
            state.componentHtml = html;
        },
        loadComponentScss(state, scss) {
            state.componentScss = scss;
        },
        loadComponentJs(state, js) {
            state.componentJs = js;
        },
        loadComponentHtmlUrl(state, url) {
            state.componentHtmlUrl = url;
        }
    },
    actions: {
        loadCategories(context, categories) {
            context.commit('loadCategories', categories.sort());
        },
        setCurrentCategory(context, category) {
            context.commit('setCurrentCategory', category);
        },
        loadCurrentComponents(context, components) {
            context.commit('loadCurrentComponents', components);
        },
        loadComponent(context, component) {
            context.commit('loadComponent', component);
            context.commit('loadComponentHtmlUrl', component.html);
            fetch(component.html)
                .then(response => response.text())
                .then(data => context.commit('loadComponentHtml', data));
            fetch(component.scss)
                .then(response => response.text())
                .then(data => context.commit('loadComponentScss', data));
            if (typeof component.js !== 'undefined') {
                fetch(component.js)
                    .then(response => response.text())
                    .then(data => context.commit('loadComponentJs', data));
            } else {
                context.commit('loadComponentJs', null);
            }
        }
    },
    getters: {
        getCategories: state => state.categories,
        getCurrentCategory: state => state.currentCategory,
        getCurrentComponents: state => state.currentComponents,
        getComponent: state => state.component,
        getComponentHtmlUrl: state => state.componentHtmlUrl,
        getComponentHtml: state => state.componentHtml,
        getComponentScss: state => state.componentScss,
        getComponentJs: state => state.componentJs
    }
})
