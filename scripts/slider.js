var slider = {
    init: function () {
        new Swiper('.swiper-container', {
            preloadImages: false,
            lazy: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
            },
            grabCursor: true
        });
    }
};