import $ from 'jquery'
/**
 * Счетчик  в инпуте
 */
$.fn.stepper = function() {
    const $self = $(this),
        self = this,
        $input = $self.find('.js-stepper__num'),
        $btnUp = $self.find('.js-c-stepper__up'),
        $btnDown = $self.find('.js-c-stepper__down'),
        $tooltipHtml = '<p class="c-stepper__tooltip js-stepper-tooltip">\n' +
            '                           <span class="c-stepper__tooltip-text js-tooltip-text"></span>\n' +
            '                       </p>',
        disabledButtonClass = 'disabled',
        inputAvailableValues = /^[0-9]*$/,
        availableKeys = [
            'ArrowLeft',
            'ArrowRight',
            'Backspace',
            'Delete'
        ];

    let timer;
    let max = $input.data('max'),
        min = $input.data('min');

    /**
     * Добавление тултипа с предупреждением об ограничении
     */
    const showTooltip = () => {
        const $tooltipText = $self.data('tooltip-text');
        $self.append($tooltipHtml);
        const $tooltipTextWrapper = $self.find('.js-tooltip-text');
        $tooltipTextWrapper.html($tooltipText);
        const $tooltip = $('.js-stepper-tooltip');
        clearTimeout(timer);
        timer = setTimeout(() => {$self.find($tooltip).remove();}, 10000);
    };

    /**
     * Дизейблим кнопку
     * @param {jQuery} $button
     */
    const disableButton = ($button) => $button.addClass(disabledButtonClass);

    /**
     * Активируем кнопку
     * @param {jQuery} $button
     */
    const activateButton = ($button) => $button.removeClass(disabledButtonClass);

    /**
     * Вычисляем подходящее значение для инпута
     * @param {number} value
     * @returns {number}
     */
    const processValue = (value) => {
        if (value >= min && value <= max) {
            return value;
        }

        if (value < min ) {
            return min;
        }

        return max;

    };

    /**
     * Устанавливаем значение инпута
     * @param {number} value
     * @param {boolean} showError
     */
    this.setValue = (value, showError) => {
        const processedValue = processValue(value);
        $input.val(processedValue);
        if (typeof showError !== 'undefined' && showError && value > processedValue) {
            showTooltip();
        }
        checkButtons();
        $self.trigger('valueChanged');
    };

    /**
     * Получаем текущее значение инпута, если значение не является числом,
     * возвращаем минимально возможное значение
     * @returns {*}
     */
    this.getValue = () => {
        const currentValue = parseInt($input.val());
        if(isNaN(currentValue)) {
            return min;
        }

        return currentValue;
    };

    /**
     * Увеличение знач-я инпута на 1
     */
    const valueUp = () => this.setValue(this.getValue() + 1, true);

    /**
     * Уменьшение знач-я инпута на 1
     */
    const valueDown = () => this.setValue(this.getValue() - 1, true);

    /**
     * Установка соотвествующего состояния кнопкам
     */
    const checkButtons = () => {
        const value = self.getValue();
        disableButton($btnDown);
        disableButton($btnUp);

        if (value > min) {
            activateButton($btnDown);
        }

        if (value < max) {
            activateButton($btnUp);
        }
    };

    /**
     * Обновление плагина
     */
    this.refresh = () => {
        max = $input.data('max');
        min = $input.data('min');
        this.setValue(this.getValue(), false);
    };

    /**
     * Начальная инициализация плагина
     */
    const init = () => {
        //устанавливаем начальное  значение
        this.setValue(this.getValue(), false);
        //сохраняем объект а дата-атрибут
        $self.data('stepper', this);
    };

    init();

    $input.on('keyup keypress input', function(e) {
        if(inputAvailableValues.test(e.key) || availableKeys.indexOf(e.key) !== -1) {
            self.setValue(this.value, true);
        } else {
            e.preventDefault();
            return false;
        }
    });

    $btnUp.on('click', () => {
        valueUp();
    });

    $btnDown.on('click', () => {
        valueDown();
    });

    return this;
};
