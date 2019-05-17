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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Sidebar from "./components/Sidebar";

    export default {
        name: 'app',
        components: {
            Sidebar
        },
        data() {
            return {
                components: []
            }
        },
        methods: {
          startComponent() {
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

                          if (this.$route.params.category === undefined) {
                              let currentPath = categories[0].toLowerCase().replace(/ /g, '_');
                              this.$router.push({ path: currentPath});
                          }

                          const category = this.$route.params.category.charAt(0).toUpperCase() + this.$route.params.category.slice(1);
                          this.$store.dispatch('setCurrentCategory',category.replace(/_/g, ' '));
                          const filteredComponents = this.components.filter(component => component.category === this.$store.state.currentCategory);
                          this.$store.dispatch('loadCurrentComponents', filteredComponents);

                      });

                  });
          }
        },
        created() {
            this.startComponent();
        },
        watch: {
            '$route'() {
                this.startComponent();

            }
        }
    };

</script>

<style lang="scss">
    #app {
        @import "../public/styles/scss/layout.scss";
        @import "../public/styles/scss/base.scss";
    }
</style>
