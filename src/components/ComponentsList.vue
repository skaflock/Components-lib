<template>
    <ul class="components-list">
        <component-view ref="component"
            v-for="component in components"
            :key="renderControl"
            :component="component"
        >
        </component-view>
    </ul>
</template>

<script>
    import ComponentView from "./ComponentView";
    let componentsList = [];
    fetch('/components.json')
        .then(response => response.json())
        .then(json => {
            for (const component in json) {
                componentsList.push(json[component]);
            }
        });
    export default {
        name: "ComponentsList",
        components: {ComponentView},
        props : ["category"],
        data() {
            return {
                renderControl: 1,
                components: null,
                currentCategory: this.category
            }
        },
        mounted() {
            setTimeout(() => {
                this.currentCategory = this.category;
                this.components = componentsList.filter(component => component.tag === this.currentCategory);
            }, 100);
            this.$watch('category', () => this.renderControl++);

        },
        methods : {
            changeItems(category) {
                    this.components = componentsList.filter(component => component.tag === category);
            }
        }
    }
</script>

<style scoped>

</style>