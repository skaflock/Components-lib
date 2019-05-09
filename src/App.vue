<template>
    <div id="app">
        <div class="page-wrapper">
            <header class="header">
                <div class="header__content">
                    <span class="header__logo">
                        <img src="../public/img/header-logo.png" alt="Logo">
                    </span>
                    <p class="header__text">Библиотека компонентов Студии Валерия Комягина</p>
                </div>
            </header>
            <sidebar :components="components"/>
            <main class="main">
                <components-list
                        ref="componentsList"
                />
            </main>
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
                components: []
            }
        },
        created() {
            let categories = [];
            let components = [];

            fetch('/components-list.json')
                .then(response => response.json())
                .then(json => {

                    const promises = json.map( (url) =>
                        fetch(url)
                        .then(response => response.json())
                        .then(json => {
                            for (const component in json) {
                                components.push(json[component]);
                                categories.push(json[component].category);
                            }
                        }));

                    Promise.all(promises).then( () => {
                        this.components = components;
                        categories = categories.filter((category, index) => categories.indexOf(category) === index);
                        categories.sort();
                        this.$store.dispatch('loadCategories',categories);
                        this.$store.dispatch('setCurrentCategory',categories[0]);
                        const filteredComponents = this.components.filter(component => component.category === this.$store.state.currentCategory);
                        this.$store.dispatch('loadCurrentComponents', filteredComponents);
                    });

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
