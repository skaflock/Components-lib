/**
 * Common tab jQuery plugin
 */
$.fn.zoom = function() {
    const $self = $(this);
    const $zoomContent = $self.find('.js-zoom-content');
    const $zoomPlusButton = $self.find('.js-zoom-plus');
    const $zoomMinusButton = $self.find('.js-zoom-minus');
    const $maxScaleButton = $self.find('.js-max-scale');
    const $minScaleButton = $self.find('.js-unscale');
    const $zoomImage = $self.find('.js-zoom-image');

    let zoomImageWidth = null;
    let zoomContentWidth = null;
    let maxCoefficient = null;
    let stepIncrement = null;
    let currentCoefficient = 1;

    const makeZoom = function(coefficient) {
        $zoomContent.css('transform', `scale(${coefficient})`);
    };

    /**
     * get zoom params: img width, content width, max coefficient, increment step
     */
    const getZoomParams = () => {
        zoomImageWidth = $zoomImage.get(0).naturalWidth;
        zoomContentWidth = $zoomContent.outerWidth();
        maxCoefficient = zoomImageWidth / zoomContentWidth;
        stepIncrement = (maxCoefficient - 1) / 5;
    };

    /**
     * Disable scale/unscale button
     * @param {jQuery} $btn
     */
    const disableButton = function($btn) {
        $btn.attr('disabled', true);
    };

    /**
     * Activate scale/unscale button
     * @param {jQuery} $btn
     */
    const activateButton = function($btn) {
        $btn.removeAttr('disabled');
    };

    /**
     * Check buttons state
     */
    const checkButtonsState = () => {
        activateButton($zoomMinusButton);
        activateButton($zoomPlusButton);
        if(currentCoefficient <= 1) {
            disableButton($zoomMinusButton);
        }
        if(currentCoefficient >= maxCoefficient) {
            disableButton($zoomPlusButton);
        }
    };

    const showMinScaleBtn = () => {
        $maxScaleButton.hide();
        $minScaleButton.show();
    };

    const showMaxScaleBtn = () => {
        $minScaleButton.hide();
        $maxScaleButton.show();
    };

    /**
     * make zoom up function
     */
    const zoomUp = () => {
        getZoomParams();
        if(currentCoefficient < maxCoefficient) {
            makeZoom(currentCoefficient + stepIncrement);
            currentCoefficient += stepIncrement;
            checkButtonsState();
            showMinScaleBtn();
        }
    };

    /**
     * make max zoom
     */
    const zoomMax = () => {
        getZoomParams();
        currentCoefficient = maxCoefficient;
        makeZoom(currentCoefficient);
        checkButtonsState();
        showMinScaleBtn();
    };

    /**
     * make zoom down function
     */
    const zoomDown = () => {
        getZoomParams();

        if(currentCoefficient > 1) {
            makeZoom(currentCoefficient - stepIncrement);
            currentCoefficient -= stepIncrement;
            checkButtonsState();
        }
        if(currentCoefficient <= 1) {
            showMaxScaleBtn();
            currentCoefficient = 1;
            makeZoom(currentCoefficient);
            $zoomContent.css({'top':'0', 'left':'0'})
        }
    };

    const zoomMin = () => {

        getZoomParams();
        currentCoefficient = 1;
        makeZoom(currentCoefficient);
        checkButtonsState();
        showMaxScaleBtn();
        $zoomContent.css({'top':'0', 'left':'0'})
    };

    /**
     * Activate drag image
     */
    const dragImageActive = () => {
        $zoomContent.draggable({
            scroll: false,
        });
    };

    dragImageActive();


    $zoomPlusButton.on('click', () => zoomUp());

    $zoomMinusButton.on('click', () => zoomDown());

    $maxScaleButton.on('click', () => zoomMax());

    $minScaleButton.on('click', () => zoomMin());

    return this;
};
