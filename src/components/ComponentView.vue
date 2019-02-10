<template>
    <li>
        <div class="component-name">{{ name }}</div>
        <common-tabs :component="currentComponent"></common-tabs>
        <a :href="npmUrl">Ссылка на npm</a>
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
                currentComponent: this.component,
                name: this.component.name,
                npmUrl: this.component.npmUrl
            }
        }
    }
</script>