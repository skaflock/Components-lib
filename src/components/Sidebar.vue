<template>
    <aside class="sidebar" id="sidebar">
        <ul>
            <li v-for="(category, index) in categories"
                :key="category.id"
                @click="changeCategory(index)"
                :class="{'active': selectedCategoryIndex === index}">
                {{category}}
            </li>
        </ul>
    </aside>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Sidebar",
        props: ["components"],
        data() {
          return {
              selectedCategoryIndex: null
          }
        },
        computed: {
            ...mapGetters({
                categories: 'getCategories',
                currentCategory: 'getCurrentCategory'
            })
        },
        methods : {
            changeCategory(index) {
                this.$store.dispatch('setCurrentCategory',this.$store.state.categories[index]);
                this.selectedCategoryIndex = index;
                const filteredComponents = this.components.filter(component => component.category === this.$store.state.currentCategory);
                this.$store.dispatch('loadCurrentComponents', filteredComponents);
                let currentPath = this.$store.state.categories[index].toLowerCase().replace(/ /g, '_');
                this.$router.push({ params: {category: currentPath}});
            }
        },
        updated() {
            this.selectedCategoryIndex = this.categories.indexOf(this.$route.params.category.charAt(0).toUpperCase() + this.$route.params.category.slice(1));
        }
    }

</script>
