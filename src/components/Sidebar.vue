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
        name: "Sidebar",
        props : ["category"],
        data() {
            return {
                selectedCategoryIndex : 0,
                tags: tagsList,
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