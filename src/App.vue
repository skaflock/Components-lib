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
            <Sidebar v-bind:category="currentCategory" @change-category="changeCategory"/>
            <main class="main">
                <components-list v-bind:category="currentCategory"/>
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

    let tagsList = [];
    fetch('/components.json')
        .then(response => response.json())
        .then(json => {
            for (const component in json) {
                tagsList.push(json[component].tag);
            }
            tagsList.sort();
        });

    export default {
        name: 'app',
        components: {
            ComponentsList,
            Sidebar
        },
        data() {
            return {
                categories : tagsList,
                currentCategory: tagsList[0]
            }
        },
        methods : {
            changeCategory(category) {
                return this.currentCategory = category;
            }
        }
    };

</script>

<style lang="scss">
    #app {
        @import "../public/styles/layout.scss";
        @import "../public/styles/base.scss";
        @import "../public/styles/common-spoiler.scss";
        @import "../public/styles/common-tab.scss";
        @import "../public/styles/stepper.scss";
    }
</style>
