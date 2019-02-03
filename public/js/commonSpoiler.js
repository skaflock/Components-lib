import $ from 'jquery'
/**
 * Common spoiler jQuery plugin
 */
$.fn.commonSpoiler = function() {
    const $self = $(this);
    const $button = $self.find('.js-common-spoiler-state-toggle');
    const showContentClass = 'opened';

    /**
     * Show spoiler content function
     */
    const showContent = function() {
        $self.addClass(showContentClass);
    };

    /**
     * Hide spoiler content function
     */
    const hideContent = function() {
        $self.removeClass(showContentClass);
    };

    $button.on('click', function() {
        $self.hasClass(showContentClass) ? hideContent() : showContent();
    });

    return this;
};