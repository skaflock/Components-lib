<template>
    <div class="common-tab js-common-tab">
        <ul class="common-tab__header">
            <li class="common-tab__link js-common-tab-link js-tab-link current" data-href="html">HTML</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="scss">SCSS</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="js">JS</li>
        </ul>
        <div class="common-tab__content js-tab-content current" data-content="html">
            <pre></pre>
        </div>
        <div class="common-tab__content js-tab-content" data-content="scss">
            <pre></pre>
        </div>
        <div class="common-tab__content js-tab-content" data-content="js">
            <pre></pre>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery/dist/jquery.slim.min'
    import commonTab from 'common-tab-svk/commonTab';

    export default {
        name: "CommonTabs",
        mounted() {
            $(this.$el).commonTab();
        },
        created() {
            fetch(this.htmlLink).then(response => response.text()).then(data => console.log(data));
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/styles/common-tab.scss";
</style>