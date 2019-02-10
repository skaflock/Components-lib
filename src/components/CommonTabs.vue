<template>
    <div class="common-tab js-common-tab">
        <ul class="common-tab__header">
            <li class="common-tab__link js-common-tab-link js-tab-link current" data-href="view">Отображение</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="html">HTML</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="scss">SCSS</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="js">JS</li>
        </ul>
        <div class="common-tab__content js-tab-content current" data-content="view">
            <iframe :src="htmlUrl" width="100%" height="400px" frameborder="0"></iframe>
        </div>
        <div class="common-tab__content js-tab-content" data-content="html">
            <pre>{{ html }}</pre>
        </div>
        <div class="common-tab__content js-tab-content" data-content="scss">
            <pre>{{ scss }}</pre>
        </div>
        <div class="common-tab__content js-tab-content" data-content="js">
            <pre>{{ js }}</pre>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import '../../public/js/plugins/serviceTab'

    export default {
        name: "CommonTabs",
        props: ['component'],
        data() {
            return {
                htmlUrl: this.component.html,
                html: fetch(this.component.html).then(response => response.text()).then(data => {this.html = data}),
                scss: fetch(this.component.scss).then(response => response.text()).then(data => {this.scss = data}),
                js: fetch(this.component.js).then(response => response.text()).then(data => {this.js = data})
            }
        },
        mounted() {
            setTimeout(() => {
                console.log($(this.html));
            });

            $(this.$el).serviceTab();
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/styles/scss/common-tab";
</style>