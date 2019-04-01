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
                selectedCategoryIndex : 0
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
                this.selectedCategoryIndex = index;
                this.$store.dispatch('setCurrentCategory',this.$store.state.categories[index]);
                const filteredComponents = this.components.filter(component => component.category === this.$store.state.currentCategory);
                this.$store.dispatch('loadCurrentComponents', filteredComponents);
            }
        }
    }

</script>