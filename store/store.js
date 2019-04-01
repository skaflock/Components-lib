import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: [],
        currentCategory: '',
        currentComponents: [],
        component: {}
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
        }
    },
    actions: {
        loadCategories(context, categories) {
            context.commit('loadCategories', categories);
        },
        setCurrentCategory(context, category) {
            context.commit('setCurrentCategory', category);
        },
        loadCurrentComponents(context, components) {
            context.commit('loadCurrentComponents', components);
        }
    },
    getters: {
        getCategories: state => state.categories,
        getCurrentCategory: state => state.currentCategory,
        getCurrentComponents: state => state.currentComponents
    }
})