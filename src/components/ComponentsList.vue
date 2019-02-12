<template>
    <ul class="components-list">
        <component-view
            v-for="component in components"
            :key="component.id"
            :component="component"
        >
        </component-view>
    </ul>
</template>

<script>
    import ComponentView from "./ComponentView";

    export default {
        name: "ComponentsList",
        components: {ComponentView},
        data() {
            return {
                renderControl: 0
            }
        },
        computed: {
            currentCategory() {
                return this.$store.state.currentCategory
            },
            components() {
                return this.$store.state.currentComponents
            }
        },
        mounted() {
            this.$watch('currentCategory', () => this.renderControl++);
        }
    }
</script>

<style scoped>

</style>
