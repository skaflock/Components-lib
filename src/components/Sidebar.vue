<template>
    <aside class="sidebar" id="sidebar">
        <ul>
            <li v-for="(tag, index) in tags"
                :key="tag.id"
                @click="changeCategory(index)"
                :class="{'active': selectedCategoryIndex === index}">
                {{tag}}
            </li>
        </ul>
    </aside>
</template>

<script>

    export default {
        name: "Sidebar",
        props : ["category", "categories"],
        data() {
            return {
                selectedCategoryIndex : 0,
                tags: this.categories,
                currentCategory: this.category
            }
        },
        methods : {
            changeCategory(index) {
                this.selectedCategoryIndex = index;
                this.currentCategory = this.tags[this.selectedCategoryIndex];
                this.$emit('change-category', this.currentCategory);
            }
        }
    }

</script>

<style scoped>

</style>