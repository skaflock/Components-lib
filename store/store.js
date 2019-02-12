import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: [],
        currentCategory: '',
        currentComponents: []
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
    }
})