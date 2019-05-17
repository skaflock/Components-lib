<template>
    <div class="common-tab js-common-tab">
        <ul class="common-tab__header">
            <li class="common-tab__link js-common-tab-link js-tab-link current" data-href="view">Отображение</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="html">HTML</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="scss">SCSS</li>
            <li v-if="showJS" class="common-tab__link js-common-tab-link js-tab-link" data-href="js">JS</li>
            <li class="common-tab__link js-common-tab-link js-tab-link" data-href="dependences">Зависимости</li>
        </ul>
        <div class="common-tab__content common-tab__content--frame js-tab-content current" data-content="view">
            <iframe :src="htmlUrl" width="100%" height="100%" frameborder="0"></iframe>
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
        <div class="common-tab__content common-tab__content--dependences js-tab-content" data-content="dependences">
            <ul>
                <li v-for="item in dependences" :key="item.id">
                    <a :href="item.link" target="_blank" class="component-links__link">{{item.name}}</a>
                </li>
            </ul>
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
                js: 'getComponentJs',
                dependences: 'getDependences'
            })
        },
        methods: {
            init() {
                const $iframe = $('iframe');
                $iframe.on('load', function() {
                    this.style.height = this.contentDocument.body.scrollHeight +'px';
                    this.style.minHeight = '500px'
                });

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
        },
        watch: {
            '$route.params.category'() {
                this.init();
            }
        }
    }
</script>

<style scoped lang="scss">
    $c-black: #2b2b2b;
    $c-white: #ffffff;
    $c-green: #11b267;

    .common-tab {
        &__header {
            display: flex;
            border-bottom: 1px solid #E6E6E6;
        }
        &__link {
            height: 100%;
            margin-right: 30px;
            margin-bottom: -1px;
            padding: 0 0 12px;
            font-size: 16px;
            line-height: 18px;
            background-color: $c-white;
            color: rgba(1, 1, 1, 0.6);
            transition: color 0.3s ease-in-out;
            cursor: pointer;
            &.current,
            &:hover {
                color: #010101;
                border-bottom: 1px solid #343434;
            }
        }
        &__content {
            display: none;
            padding: 50px 0 0;
            background-color: $c-black;
            color: $c-green;
            font-size: 14px;
            line-height: 1.5;
            pre {
                width: 100%;
                height: 100%;
                background-color: $c-black;
                color: $c-green;
                font-size: 14px;
                line-height: 1.5;
            }
            &.current {
                display: block;
            }
            &--frame {
                background-color: $c-white;
            }
            &--dependences {
                background-color: $c-white;
                ul {
                    display: flex;
                    li {
                        margin-right: 20px;
                    }
                }
            }
        }
    }
</style>
