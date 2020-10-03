document.addEventListener('DOMContentLoaded', function () {
    window.supportPassive = utils.doesSupportPassive();
    animations.setup();
    header.init();
    threeDimensional.init();
    slider.init();
    liveMileage.init();
    //lazyLoad.init();

    fixTable(document.getElementById('fixed-table-container'));
}, false);