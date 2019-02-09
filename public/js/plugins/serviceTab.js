import $ from 'jquery'
/**
 * Common tab jQuery plugin
 */
$.fn.serviceTab = function() {
    const $self = $(this);
    const $link = $self.find('.js-tab-link');
    const $content = $self.find('.js-tab-content');
    const currentContentClass = 'current';

    /**
     * Show content function
     * @param {object} el
     */
    const showContent = function(el) {
        $content.removeClass(currentContentClass);
        el.addClass(currentContentClass);
    };

    /**
     * Change active tab function
     * @param {object} el
     */
    const changeActiveTab = function(el) {
        $link.removeClass(currentContentClass);
        el.addClass(currentContentClass);
    };

    $link.on('click', function() {
        const href = $(this).data('href');
        let $newContent = null;
        $content.each(function() {
            if($(this).data('content') === href) {
                $newContent = $(this);
            }
        });
        showContent($newContent);
        changeActiveTab($(this));
    });

    return this;
};
