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
            let categories = [];
            let components = [];
            fetch('/components-list.json')
                .then(response => response.json())
                .then(json => {
                    const componentsList = json;

                    componentsList.forEach( (url) => {
                        fetch(url)
                            .then(response => response.json())
                            .then(json => {
                                components.push(json);
                                categories.push(json.category);
                        })
                    });

                    this.components = components;
                    categories = categories.filter((category, index) => categories.indexOf(category) === index);
                    categories.sort();
                    console.log(categories);
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
