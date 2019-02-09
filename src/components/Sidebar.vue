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

    export default {
        name: "Sidebar",
        data() {
            return {
                selectedCategoryIndex : 0,
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
        methods : {
            changeCategory(index) {
                this.selectedCategoryIndex = index;
                this.$store.commit('setCurrentCategory',this.$store.state.categories[index]);
                const filteredComponents = this.$store.state.components.filter(component => component.category === this.$store.state.currentCategory);
                this.$store.commit('loadCurrentComponents', filteredComponents);
            }
        }
    }

</script>

<style scoped>

</style>