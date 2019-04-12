<template>
    <div class="common-tab js-common-tab">
        <ul class="common-tab__header">
            <li class="common-tab__link js-common-tab-link js-tab-link current" data-href="view">Отображение</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="html">HTML</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="scss">SCSS</li>
            <li v-if="showJS" class="common-tab__link js-common-tab-link js-tab-link" data-href="js">JS</li>
        </ul>
        <div class="common-tab__content common-tab__content--frame js-tab-content current" data-content="view">
            <iframe :src="htmlUrl" width="100%" height="400px" frameborder="0"></iframe>
        </div>
        <div class="common-tab__content js-tab-content" data-content="html">
            <pre v-highlightjs="html"><code class="html"></code></pre>
        </div>
        <div class="common-tab__content js-tab-content" data-content="scss">
            <pre v-highlightjs="scss"><code class="scss"></code></pre>
        </div>
        <div v-if="showJS" class="common-tab__content js-tab-content" data-content="js">
            <pre v-highlightjs="js"><code class="javascript"></code></pre>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import '../../public/js/plugins/serviceTab'
    import {mapGetters} from 'vuex';

    export default {
        name: "CommonTabs",
        data() {
            return {
                showJS: true
            }
        },
        computed: {
            ...mapGetters({
                htmlUrl: 'getComponentHtmlUrl',
                html: 'getComponentHtml',
                scss: 'getComponentScss',
                js: 'getComponentJs'
            })
        },
        methods: {
            init() {
                if (this.$store.state.componentJs !== null) {
                    this.showJS = true;
                } else {
                    this.showJS = false;
                }
                $(this.$el).serviceTab();
            },

            setActiveTab() {
                const tabLinks = this.$el.querySelectorAll('.js-tab-link');
                const tabContent = this.$el.querySelectorAll('.js-tab-content');

                tabLinks.forEach( el => el.classList.remove('current'));
                tabContent.forEach( el => el.classList.remove('current'));
                tabLinks[0].classList.add('current');
                tabContent[0].classList.add('current');
            }
        },
        updated() {
            this.init();
        },
        beforeUpdate() {
            this.setActiveTab();
        },
        mounted() {
            setTimeout(() => {this.init();}, 300);
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/components/common-tab/common-tab";
</style>
