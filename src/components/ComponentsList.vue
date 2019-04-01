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
    import {mapGetters} from 'vuex';

    export default {
        name: "ComponentsList",
        components: {ComponentView},
        computed: {
            ...mapGetters({
                components: 'getCurrentComponents',
                currentCategory: 'getCurrentCategory'
            })
        }
    }
</script>
