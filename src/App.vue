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
            <sidebar />
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

    export default {
        name: 'app',
        components: {
            ComponentsList,
            Sidebar
        },
        data() {
            return {
            }
        },
        computed: {
            categories()  {
                return this.$store.state.categories
            },
            currentCategory() {
                return this.$store.state.currentCategory
            }
        },
        created() {
            fetch('/components.json')
                .then(response => response.json())
                .then(json => {
                    let currentCategoriesArray = [];
                    let components = [];
                    for (const component in json) {
                        currentCategoriesArray.push(json[component].category);
                        components.push(json[component]);
                    }
                    currentCategoriesArray.sort();
                    this.$store.commit('loadCategories',currentCategoriesArray);
                    this.$store.commit('loadComponents',components);
                    this.$store.commit('setCurrentCategory',currentCategoriesArray[0]);
                    const filteredComponents = this.$store.state.components.filter(component => component.category === this.$store.state.currentCategory);
                    this.$store.commit('loadCurrentComponents', filteredComponents);
                });

        }
    };

</script>

<style lang="scss">
    #app {
        @import "../public/styles/scss/layout.scss";
        @import "../public/styles/scss/base.scss";
        @import "../public/styles/scss/common-spoiler.scss";
        @import "../public/styles/scss/common-tab.scss";
        @import "../public/styles/scss/stepper.scss";
    }
</style>
