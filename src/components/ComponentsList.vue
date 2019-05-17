<template>
    <main class="main">
        <ul class="components-list">
            <component-view
                    v-for="component in components"
                    :key="component.id"
                    :component="component"
            >
            </component-view>
        </ul>
    </main>
</template>

<script>
    import ComponentView from "./ComponentView";
    import {mapGetters} from 'vuex';

    export default {
        name: "ComponentsList",
        components: {ComponentView},
        computed: {
            ...mapGetters({
                components: 'getCurrentComponents'
            })
        },
        watch: {
            '$route.params.category'(category) {
                this.$store.dispatch('setCurrentCategory',category);
            }
        }
    }
</script>
