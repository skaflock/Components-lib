<template>
    <li>
        <div class="component-name">{{ name }}</div>
        <div class="component-description">{{ description }}</div>
        <div class="component-links">
            <a :href="scssUrl" download class="component-links__link">Скачать стили</a>
            <a v-if="typeof component.npmUrl !== 'undefined'" :href="npmUrl" class="component-links__link">Ссылка на npm</a>
        </div>
        <common-tabs></common-tabs>

    </li>
</template>

<script>
    import CommonTabs from "./CommonTabs";
    export default {
        name: "ComponentView",
        components: {CommonTabs},
        props : ["component"],
        data() {
            return {
            }
        },
        computed: {
            name() {
                return this.component.name
            },
            description() {
                if (typeof this.component.description !== 'undefined') {
                    return this.component.description
                }
            },
            npmUrl() {
                return this.component.npmUrl
            },
            scssUrl() {
                return this.component.scss
            }
        },
        created() {
            this.$store.dispatch('loadComponent',this.component);
        },
        updated() {
            this.$store.dispatch('loadComponent',this.component);
        }
    }
</script>
<style lang="scss">
    @import "../../public/styles/scss/common-styles.scss";
</style>
