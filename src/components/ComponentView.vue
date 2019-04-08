<template>
    <li>
        <div class="component-name">{{ name }}</div>
        <common-tabs></common-tabs>
        <a v-if="typeof component.npmUrl !== 'undefined'" :href="npmUrl">Ссылка на npm</a>
        <a :href="scssUrl" download>Скачать стили</a>
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
