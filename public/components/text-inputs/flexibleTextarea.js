/**
 * Функция открытия гамбургер-меню
 * @param {object} options
 */
$.fn.flexibleTextarea = function(options) {
    const $self = $(this);
    const textareaHeight = options.height;


    /**
     * Регулируем высоту textarea
     */
    const adjustTextareaHeight = (el) => {
        console.log(el[0].scrollHeight, el[0].clientHeight);
        el.outerHeight((el[0].scrollHeight > el[0].clientHeight) ? (el[0].scrollHeight) + "px" : `${textareaHeight}px`);
    };

    const init = () => {
        adjustTextareaHeight($self);
    };

    $(this).on('keyup', function () {
        adjustTextareaHeight($self);
    });

    init();

    return this;
};
