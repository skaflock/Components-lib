(function ($) {
    // jshint jquery: true
    'use strict';

    /**
     * Simple collapsible block
     * @param {object} [options] - configuration object
     * @param {string} options.collapsedClass - class to set when block is collapsed
     * @param {string} options.contentSelector - selector string for content block
     * @param {string} options.toggleSelector - selector string for toggle element
     * @param {boolean} options.slide - type of margin to use for animation
     * @returns {jQuery}
     */
    $.fn.collapsible = function (options) {
        $(this).each(function() {
            var defaults = {
                collapsedClass: 'collapsed',
                contentSelector: '.js-collapsible-content',
                toggleSelector: '.js-collapsible-toggle',
                slide: false
            };
            var settings = $.extend({}, defaults, options);

            var $container = $(this);
            var $content = $container.find(settings.contentSelector);
            var $toggle = $container.find(settings.toggleSelector);

            /**
             * Refresh dimensions
             */
            var refresh = function() {
                $container.css({
                    overflow: 'hidden'
                });
                if ($container.hasClass(settings.collapsedClass)) {
                    $content.css(
                        (settings.slide ? 'margin-top': 'margin-bottom'), -1 * $content.outerHeight() + 'px'
                    );
                } else {
                    $content.css((settings.slide ? 'margin-top': 'margin-bottom'), 0);
                }
            };

            /**
             * Expand block
             */
            var expand = function() {
                $container.removeClass(settings.collapsedClass);
                $toggle.removeClass(settings.collapsedClass);
                refresh();
            };

            /**
             * Collapse block
             */
            var collapse = function() {
                $container.addClass(settings.collapsedClass);
                $toggle.addClass(settings.collapsedClass);
                refresh();
            };

            /**
             * Events
             */
            // Toggle block state
            $toggle.on('click', function () {
                if ($container.hasClass(settings.collapsedClass)) {
                    expand();
                } else {
                    collapse();
                }
            });

            // Resize handler
            $(window).on('resize', function () {
                refresh();
            });

            // Set initial block state
            $(window).on('load', function() {
                if ($container.hasClass(settings.collapsedClass)) {
                    $content.css('transition', 'none')
                        .delay(100)
                        .queue(function(done) {
                            collapse();
                            done();
                        })
                        .delay(500)
                        .queue(function(done) {
                            $content.css('transition', '');
                            done();
                        });
                }
            });

            this.refresh = refresh;
            this.expand = expand;
            this.collapse = collapse;

            return this;
        });
    };
} (jQuery));
