(function ($) {
    /* global: $, jQuery, Dragdealer */
    /* jshint browser: true */

    $.fn.scrollbar = function (options) {
        var defaults = {
            contentWrapperClass: 'js-scroll-content-wrap',
            scrollbarClass: 'dd-scrollbar',
            handleClass: 'dd-handle'
        };
        var settings = $.extend({}, defaults, options);

        var $container = $(this);
        $container.wrapInner($('<div />', {
            class: settings.contentWrapperClass
        }));
        var $inner = $container.children(function () {
            return $(this).hasClass(settings.contentWrapperClass);
        });

        $inner.css({
            position: 'relative',
            backgroundColor: 'magenta',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100%'
        });

        if ($inner.get(0).scrollHeight > $inner.get(0).clientHeight) {
            $inner.css({
                // прячем стандартный скроллбар за правой границей блока
                'margin-right': $inner.get(0).clientWidth - $container.get(0).clientWidth + 'px'
            });
            var scrollTimeout;
            var $ddRail = $('<div/>').addClass('dragdealer').appendTo($container);
            var $ddHandle = $('<div/>').addClass('handle').appendTo($ddRail);
            $ddRail.data('dragdealer', new Dragdealer($ddRail.get(0), {
                slide: false,
                horizontal: false,
                vertical: true,
                animationCallback: function (x, y) {
                    if (!$inner.hasClass('scrolling')) {
                        $inner.scrollTop(y * ($inner.get(0).scrollHeight - $container.height()));
                    }
                }
            }));
            $inner.on('scroll', function () {
                if (!$ddRail.hasClass('active')) {
                    $inner.addClass('scrolling');
                    $ddRail.data('dragdealer').setValue(0, $inner.get(0).scrollTop / $inner.get(0).scrollHeight);
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(function () {
                        $inner.removeClass('scrolling');
                    }, 200);
                }

            });
        } else {
            if ($container.find('.dragdealer').length) {
                $container.find('.dragdealer').remove();
            }
        }

        return this;
    };

}(jQuery));
