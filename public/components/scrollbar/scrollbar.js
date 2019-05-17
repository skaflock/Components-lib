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
            overflow: 'hidden auto',
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
            $ddHandle.css({
                height: Math.max(50, Math.ceil($container.height() * ($container.height() / $inner.get(0).scrollHeight))) + 'px'
            });
            $ddRail.data('dragdealer', new Dragdealer($ddRail.get(0), {
                horizontal: false,
                vertical: true,
                slide: false,
                animationCallback: function (x, y) {
                    if (!$inner.hasClass('scrolling')) {
                        $inner.scrollTop(y * ($inner.get(0).scrollHeight - $container.height()));
                    }
                }
            }));
            $inner.on('scroll', {passive: true}, function () {
                var scrollTop = $inner.get(0).scrollTop;
                var scrollHeight = $inner.get(0).scrollHeight;
                var containerHeight = $container.height();
                var ddValue = $ddRail.data('dragdealer').getValue()[1];
                if (!$ddRail.hasClass('active')) {
                    $inner.addClass('scrolling');
                    $ddRail.data('dragdealer').setValue(0, (scrollTop + (ddValue * containerHeight)) / scrollHeight, true);
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(function () {
                        $inner.removeClass('scrolling');
                    }, 100);
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
