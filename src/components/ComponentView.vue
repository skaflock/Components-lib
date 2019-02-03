<template>
    <li>
        <div class="component-name">{{ name }}</div>
        <div v-html="html"></div>
        <div class='common-spoiler js-common-spoiler'>
            <button type='button' class='common-spoiler__state-toggle js-common-spoiler-state-toggle'>
                <span class='common-spoiler__state-toggle-icon'></span>
            </button>
            <div class='common-spoiler__content'>
                <div class="common-tab js-common-tab">
                    <ul class="common-tab__header">
                        <li class="common-tab__link js-common-tab-link js-tab-link current" data-href="html">HTML</li>
                        <li class="common-tab__link js-common-tab-link js-tab-link" data-href="scss">SCSS</li>
                        <li class="common-tab__link js-common-tab-link js-tab-link" data-href="js">JS</li>
                    </ul>
                    <div class="common-tab__content js-tab-content current" data-content="html">
                        <pre>{{ html }}</pre>
                    </div>
                    <div class="common-tab__content js-tab-content" data-content="scss">
                        <pre>{{ scss }}</pre>
                    </div>
                    <div class="common-tab__content js-tab-content" data-content="js">
                        <pre>{{ js }}</pre>
                    </div>
                </div>
                <a :href="npmUrl">Ссылка на npm</a>
            </div>
        </div>
    </li>
</template>

<script>
    import $ from "jquery";
    import "../../public/js/commonTab"
    import "../../public/js/commonSpoiler"
    import "../../public/js/stepper"
    export default {
        name: "ComponentView",
        props : ["component"],
        data() {
            return {
                name: this.component.name,
                html: fetch(this.component.html).then(response => response.text()).then(data => {this.html = data}),
                scss: fetch(this.component.scss).then(response => response.text()).then(data => {this.scss = data}),
                js: fetch(this.component.js).then(response => response.text()).then(data => {this.js = data}),
                npmUrl: this.component.npmUrl
            }
        },
        mounted() {
            setTimeout(() =>{
                const $vm = $(this.$el);
                $vm.find('.js-common-tab').each(function(){
                    $(this).commonTab()
                });
                $vm.find('.js-common-spoiler').each(function(){
                    $(this).commonSpoiler()
                });
                if(this.component.plugin.length) {
                    eval(this.component.plugin);
                }
            }, 100);

        }
    }
</script>

<style scoped>

</style>