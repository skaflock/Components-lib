/**
 * Функция взятия / снятия фокуса с инпута
 */
$.fn.focusField = function() {
    const $self = $(this);

    /**
     * Вешаем класс в фокусе
     */
    const makeInFocus = () => $self.addClass('in-focus');

    /**
     * Снимаем класс по выходу из фокуса
     */
    const makeOutFocus = () => $self.removeClass('in-focus');

    /**
     * По фокусу на поле вешаем класс
     */
    $self.on('focus', () => makeInFocus());

    /**
     * По снятию фокуса с поля убираем класс
     */
    $self.on('blur', () => {
        if($(this).val() === '') {
            makeOutFocus();
        }
    });

    return $self;
};
