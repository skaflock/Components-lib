<template>
    <ul class="components-list">
        <component-view
            v-for="component in components"
            v-bind:key="component.id"
            v-bind:component="component"
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
                components: null
            }
        },
        mounted() {
                this.components = componentsList.filter(component => component.tag === this.category);
                console.log(componentsList)
        }
    }
</script>

<style scoped>

</style>