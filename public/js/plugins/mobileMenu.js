/**
 * Функция открытия гамбургер-меню
 * @param {object} options
 */
$.fn.mobileMenu = function(options) {
    const $self = $(this);
    const $toggleMenuButton = $self.find('.js-hamburger-btn');

    let animation;
    if (typeof options === "object") {
        animation = options.animation;
    }

    const menuIsOpenedClass = 'opened';
    const crossAnimationClass = 'crossAnimation';
    const linesAnimationClass = 'linesAnimation';

    /**
     * Открыть меню
     */
    const openMenu = () => {
        $self.addClass(menuIsOpenedClass);
        if (animation === crossAnimationClass) {
            $self.addClass(crossAnimationClass);
        }
        if (animation === linesAnimationClass) {
            $self.addClass(linesAnimationClass);
        }
    };

    /**
     * Закрыть меню
     */
    const closeMenu = () => {
        $self.removeClass(menuIsOpenedClass);
        if (animation === crossAnimationClass) {
            $self.removeClass(crossAnimationClass);
        }
        if (animation === linesAnimationClass) {
            $self.removeClass(linesAnimationClass);
        }
    };

    /**
     * Переключение закрытого/открытого состояния меню
     */
    const toggleMenu = () => !$self.hasClass(menuIsOpenedClass) ? openMenu() : closeMenu();

    /**
     * Переключить состояние меню по клику на бургер
     */
    $toggleMenuButton.on('click', function() {
        toggleMenu();
    });
};
