<template>
    <div id="app">
        <div class="page-wrapper">
            <header class="header">
                <div class="container">
                    <div class="header__content">
                        <span class="header__logo">
                            <img src="../public/img/header-logo.png" alt="Logo">
                        </span>
                        <p class="header__text">Библиотека компонентов Студии Валерия Комягина</p>
                    </div>
                </div>
            </header>
            <sidebar :components="components"/>
            <main class="main">
                <components-list
                        ref="componentsList"
                />
            </main>
            <footer class="footer">
                <div class="container">
                    Здесь может быть Ваша реклама!
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
    import Sidebar from "./components/Sidebar";
    import ComponentsList from "./components/ComponentsList";
    import {mapGetters} from 'vuex';

    export default {
        name: 'app',
        components: {
            ComponentsList,
            Sidebar
        },
        data() {
            return {
                components: []
            }
        },
        computed: {
            ...mapGetters({
                categories: 'getCategories',
                currentCategory: 'getCurrentCategory'
            })
        },
        created() {
            fetch('/components.json')
                .then(response => response.json())
                .then(json => {

                    let categories = [];
                    let components = [];

                    for (const component in json) {
                        categories.push(json[component].category);
                        components.push(json[component]);
                    }

                    this.components = components;
                    categories = categories.filter((category, index) => categories.indexOf(category) === index);
                    categories.sort();
                    this.$store.dispatch('loadCategories',categories);
                    this.$store.dispatch('setCurrentCategory',categories[0]);
                    const filteredComponents = this.components.filter(component => component.category === this.$store.state.currentCategory);
                    this.$store.dispatch('loadCurrentComponents', filteredComponents);
                });
        }
    };

</script>

<style lang="scss">
    #app {
        @import "../public/styles/scss/layout.scss";
        @import "../public/styles/scss/base.scss";
    }
</style>
