<template>
    <div class='common-spoiler js-common-spoiler'>
        <button type='button' class='common-spoiler__state-toggle js-common-spoiler-state-toggle'>
            <span class='common-spoiler__state-toggle-icon'></span>
        </button>
        <div class='common-spoiler__content'></div>
    </div>
</template>

<script>
    import $ from 'jquery/dist/jquery.slim.min';
    import commonSpoiler from 'common-spoiler-svk/commonSpoiler';
    export default {
        name: "CommonSpoiler",
        mounted() {
            console.log($(this.$el));
            $(this.$el).commonSpoiler();
        },
    }
</script>

<style scoped lang="scss">
    @import "../../public/styles/common-spoiler.scss";
</style>